import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface _SERVICE {
  'getNftBackendCanisterId' : ActorMethod<[], Principal>,
  'getOwnerNfts' : ActorMethod<[Principal], Array<Principal>>,
  'isListed' : ActorMethod<[Principal], boolean>,
  'listItem' : ActorMethod<[Principal, bigint], string>,
  'mint' : ActorMethod<[Uint8Array | number[], string], Principal>,
}
