import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface _SERVICE {
  'getListedNFTs' : ActorMethod<[], Array<Principal>>,
  'getListedNftPrice' : ActorMethod<[Principal], bigint>,
  'getNftBackendCanisterId' : ActorMethod<[], Principal>,
  'getOriginalOwner' : ActorMethod<[Principal], Principal>,
  'getOwnerNfts' : ActorMethod<[Principal], Array<Principal>>,
  'isListed' : ActorMethod<[Principal], boolean>,
  'listItem' : ActorMethod<[Principal, bigint], string>,
  'mint' : ActorMethod<[Uint8Array | number[], string], Principal>,
}
