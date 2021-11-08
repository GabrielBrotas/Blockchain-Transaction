from brownie import accounts, MockWETH, MockV3Aggregator, network, config, Contract

NON_FORKED_LOCAL_BLOCKCHAIN_ENVIRONMENTS = ["hardhat", "development", "ganache"]
LOCAL_BLOCKCHAIN_ENVIRONMENTS = NON_FORKED_LOCAL_BLOCKCHAIN_ENVIRONMENTS + [
    "mainnet-fork",
    "binance-fork",
    "matic-fork",
]

# INITIAL_PRICE_FEED_VALUE = 2000000000000000000000  # 2000 * 10 ** 18
# DECIMALS = 18  # decimals

# contract_to_mock = {
#     "eth_usd_price_feed": MockV3Aggregator,
#     "weth_token": MockWETH,  # a mock abi/interface for the WETH token
# }

def get_account(index=None):
    if index:
        return accounts[index]
    if network.show_active() in LOCAL_BLOCKCHAIN_ENVIRONMENTS:
        return accounts[0]

    return accounts.add(config["wallets"]["from_key"])


# def deploy_mocks():
#     print("Deploying Mock Price Feed...")
#     mock_price_feed = MockV3Aggregator.deploy(
#         DECIMALS, INITIAL_PRICE_FEED_VALUE, {"from": get_account()}
#     )
#     print(f"Deployed to {mock_price_feed.address}")

#     print("Deploying WETH Token...")
#     weth_token = MockWETH.deploy({"from": get_account()})
#     print(f"WETH Token deployed => {weth_token.address}")


# def get_contract(contract_name):
#     contract_type = contract_to_mock[contract_name]

#     if network.show_active() in NON_FORKED_LOCAL_BLOCKCHAIN_ENVIRONMENTS:
#         if len(contract_type) <= 0:
#             deploy_mocks()
#         contract = contract_type[-1]
#     else:
#         try:
#             contract_address = config["networks"][network.show_active()][contract_name]
#             contract = Contract.from_abi(
#                 contract_type._name, contract_address, contract_type.abi
#             )
#         except KeyError:
#             print(
#                 f"{network.show_active()} address not found, perhaps you should add it to the config or deploy mocks?"
#             )
#             print(
#                 f"brownie run scripts/deploy_mocks.py --network {network.show_active()}"
#             )

#     return contract
