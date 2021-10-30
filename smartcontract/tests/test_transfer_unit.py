from brownie import network, exceptions
from scripts._utils import (
    get_account,
    INITIAL_PRICE_FEED_VALUE,
    DECIMALS,
    get_contract,
    LOCAL_BLOCKCHAIN_ENVIRONMENTS,
)
from scripts.deploy import deploy_transfer
import pytest


def test_check_if_weth_token_is_allowed():
    if network.show_active() not in LOCAL_BLOCKCHAIN_ENVIRONMENTS:
        pytest.skip("Only for local test")

    transfer = deploy_transfer()

    assert transfer.allowedTokens(0) == get_contract("weth_token").address


def test_check_token_is_allowed():
    if network.show_active() not in LOCAL_BLOCKCHAIN_ENVIRONMENTS:
        pytest.skip("Only for local test")

    transfer = deploy_transfer()

    assert transfer.tokenIsAllowed(get_contract("weth_token").address) == True


def test_check_add_token_allowed():
    if network.show_active() not in LOCAL_BLOCKCHAIN_ENVIRONMENTS:
        pytest.skip("Only for local test")

    owner = get_account()
    non_owner = get_account(index=1)
    transfer = deploy_transfer()

    with pytest.raises(exceptions.VirtualMachineError):
        transfer.addAllowedToken(
            get_contract("weth_token").address,
            get_contract("eth_usd_price_feed").address,
            {"from": non_owner},
        )

    transfer.addAllowedToken(
        get_contract("weth_token").address,
        get_contract("eth_usd_price_feed").address,
        {"from": owner},
    )
    assert transfer.allowedTokens(1) == get_contract("weth_token").address


def test_get_token_value():
    if network.show_active() not in LOCAL_BLOCKCHAIN_ENVIRONMENTS:
        pytest.skip("Only for local test")

    transfer = deploy_transfer()
    response = transfer.getValueUsdEth(get_contract("weth_token").address)

    assert response == (INITIAL_PRICE_FEED_VALUE, DECIMALS)


def test_get_convertion_rate():
    if network.show_active() not in LOCAL_BLOCKCHAIN_ENVIRONMENTS:
        pytest.skip("Only for local test")

    transfer = deploy_transfer()
    response = transfer.getConvertionRate(1, get_contract("weth_token").address)

    assert response == (INITIAL_PRICE_FEED_VALUE / (1 * 10 ** DECIMALS))


def test_transfer_ether():
    if network.show_active() not in LOCAL_BLOCKCHAIN_ENVIRONMENTS:
        pytest.skip("Only for local test")

    transfer = deploy_transfer()

    owner = get_account()
    non_owner = get_account(index=1)

    with pytest.raises(exceptions.VirtualMachineError):
        transfer.transferEther(
            get_contract("weth_token").address, non_owner, {"from": owner, "value": 1}
        )

    ONE_ETHER = 1000000000000000000
    FIRST_BALANCE = ONE_ETHER * 100

    assert owner.balance() == FIRST_BALANCE
    tx.wait(1)

    tx = transfer.transferEther(
        get_contract("weth_token").address,
        non_owner,
        {"from": owner, "value": ONE_ETHER},
    )

    assert owner.balance() == FIRST_BALANCE - ONE_ETHER
    assert non_owner.balance() == FIRST_BALANCE + ONE_ETHER
