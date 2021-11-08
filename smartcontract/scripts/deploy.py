from brownie import Transfer, config, network
# from scripts._utils import get_account, get_contract
from scripts._utils import get_account
import yaml
import json
import os
import shutil

def deploy_transfer(should_update_front_end=False):
    account = get_account()

    transfer = Transfer.deploy(
        {"from": account},
        publish_source=config["networks"][network.show_active()]["verify"],
    )

    # weth_token = get_contract("weth_token")

    # allowed_tokens = {weth_token: get_contract("eth_usd_price_feed")}

    # add_allowed_tokens(transfer, allowed_tokens, account)

    if(should_update_front_end):
        update_front_end()
    return transfer


# def add_allowed_tokens(transfer, tokens_address, account):
#     for token in tokens_address:
#         tx = transfer.addAllowedToken(
#             token.address, tokens_address[token].address, {"from": account}
#         )
#         tx.wait(1)


def update_front_end():
    # Send the build folder
    copy_folders_to_front_end("./build", "../client/src/chain-info")
    
    # Sending the front end our config in JSON Format
    with open("brownie-config.yaml", "r") as browni_config:
        # send the brownie-config.yaml file to client folder
        config_dict = yaml.load(browni_config, Loader=yaml.FullLoader)
        with open("../client/src/brownie-config.json", "w") as brownie_config_json:
            brownie_config_json.write(json.dumps(config_dict))

    print("front end updated")

def copy_folders_to_front_end(src, dest):
    if os.path.exists(dest):
        # if the folder already exists we delete
        shutil.rmtree(dest)
    # after delete we send the new one
    shutil.copytree(src, dest)

def main():
    deploy_transfer(should_update_front_end=True)
