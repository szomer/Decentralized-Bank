# Decentralized Apps

- [Web3.0](https://ethereum.org/en/web3/) fontend/backend applications
- The back-end witten in [Motoko](https://internetcomputer.org/docs/current/motoko/main/motoko) programming language
- Running on DFINITY'S [The Internet Computer](https://internetcomputer.org/what-is-the-ic) (ICP) general-purpose block-chain.

## 1. NFT Market Place

A marketplace to browse, buy and sell NFTs. The back end fully manages the NFTs, listings, owners, prices, and is connected to the **2. Potato Token** backend canister to handle any transactions made.

- The front-end created with React framework.
- Offers session authentication with [Internet Identity](https://medium.com/dfinity/internet-identity-the-end-of-usernames-and-passwords-ff45e4861bf7).

> The home page of the NFT market place
> ![alt NFT Market Place](nft/home.jpg?raw=true)

> Discover page to view and buy peoples NFT listings.
> ![alt Discovery page](nft/discover.jpg?raw=true)

> NFT Minter page to add a NFT to the user's collection.
> ![alt Minting NFT Page](nft/minting.jpg?raw=true)

> The user's NFTs that can be listed for sale on the market place.
> ![alt My Collection Page](nft/mynfts.jpg?raw=true)

## 2. PoTato Token

PoTato Token (TATO) is my own created crypto currency. This application allows users to manage their balance and transfer tokens to other Internet Identity users.
Live deployed on block-chain [HERE](https://wbur4-uaaaa-aaaag-abhqa-cai.ic0.app/).

- The front-end created with React framework.
- Offers session authentication with [Internet Identity](https://medium.com/dfinity/internet-identity-the-end-of-usernames-and-passwords-ff45e4861bf7).

> First time loading the application, the user is required to log in with the use of internet identity.
> ![alt Authentication with Internet Identity](token/screenshot2.jpg?raw=true)

> After successful authentication, the user can manage their tokens.
> ![alt PoTato Token App](token/screenshot.jpg?raw=true)

## 3. Banking App

Withdraw / Deposit money from a bankaccount.

- Compound interest formula:

> ![alt Banking App](dbank/compound_interest.svg?raw=true) <br/> 
> ![alt Banking App](dbank/screenshot.jpg?raw=true)

## 4. Keeping Notes App

Create, Store, Read, and Delete notes.

- The front-end created with React framework.

> ![alt Keeper App](dkeeper/keeper.jpg?raw=true)
