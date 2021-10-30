from brownie import Transfer, config, network
from scripts._utils import get_account, get_contract

def deploy_transfer():
    account = get_account()

    transfer = Transfer.deploy(
        {"from": account},
        publish_source=config["networks"][network.show_active()]["verify"],
    )

    weth_token = get_contract("weth_token")

    allowed_tokens = {weth_token: get_contract("eth_usd_price_feed")}

    add_allowed_tokens(transfer, allowed_tokens, account)

    return transfer


def add_allowed_tokens(transfer, tokens_address, account):
    for token in tokens_address:
        tx = transfer.addAllowedToken(
            token.address, tokens_address[token].address, {"from": account}
        )
        tx.wait(1)


def main():
    deploy_transfer()
