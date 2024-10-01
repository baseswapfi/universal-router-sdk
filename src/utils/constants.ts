import { BigNumber } from 'ethers'

export enum UniversalRouterVersion {
  V1_2 = '1.2',
  V2_0 = '2.0',
}

export type RouterConfig = {
  address: string
  creationBlock: number
}

type ChainConfig = {
  weth: string
  routerConfigs: { [key in UniversalRouterVersion]: RouterConfig }
}
const WETH_NOT_SUPPORTED_ON_CHAIN = '0x0000000000000000000000000000000000000000'

const CHAIN_CONFIGS: { [key: number]: ChainConfig } = {
  //optimism
  [10]: {
    weth: '0x4200000000000000000000000000000000000006',
    routerConfigs: {
      [UniversalRouterVersion.V1_2]: {
        address: '0x8A1C25a8414834b59Bc0bfEBB25fd98F18Db314e',
        creationBlock: 125766022,
      },
      [UniversalRouterVersion.V2_0]: {
        address: '',
        creationBlock: 0,
      },
    },
  },
  // // arbitrum
  // [42161]: {
  //   router: '0x3fC91A3afd70395Cd496C647d5a6CC9D4B2b7FAD',
  //   weth: '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1',
  //   creationBlock: 87206402,
  // },
  // base mainnet
  [8453]: {
    weth: '0x4200000000000000000000000000000000000006',
    routerConfigs: {
      [UniversalRouterVersion.V1_2]: {
        address: '0x73f4792E10076c1C26152DcF138D0BE252aB3338',
        creationBlock: 5118970,
      },
      [UniversalRouterVersion.V2_0]: {
        address: '',
        creationBlock: 0,
      },
    },
  },
  // mode mainnet
  [34443]: {
    weth: '0x4200000000000000000000000000000000000006',
    routerConfigs: {
      [UniversalRouterVersion.V1_2]: {
        address: '0x99687aD0509AbcD493D2076D78C8C3479aDd6A67',
        creationBlock: 3841380,
      },
      [UniversalRouterVersion.V2_0]: {
        address: '',
        creationBlock: 0,
      },
    },
  },
}

export const UNIVERSAL_ROUTER_ADDRESS = (version: UniversalRouterVersion, chainId: number): string => {
  if (!(chainId in CHAIN_CONFIGS)) throw new Error(`Universal Router not deployed on chain ${chainId}`)
  return CHAIN_CONFIGS[chainId].routerConfigs[version].address
}

export const UNIVERSAL_ROUTER_CREATION_BLOCK = (version: UniversalRouterVersion, chainId: number): number => {
  if (!(chainId in CHAIN_CONFIGS)) throw new Error(`Universal Router not deployed on chain ${chainId}`)
  return CHAIN_CONFIGS[chainId].routerConfigs[version].creationBlock
}

export const WETH_ADDRESS = (chainId: number): string => {
  if (!(chainId in CHAIN_CONFIGS)) throw new Error(`Universal Router not deployed on chain ${chainId}`)

  if (CHAIN_CONFIGS[chainId].weth == WETH_NOT_SUPPORTED_ON_CHAIN) throw new Error(`Chain ${chainId} does not have WETH`)

  return CHAIN_CONFIGS[chainId].weth
}

export const CONTRACT_BALANCE = BigNumber.from(2).pow(255)
export const ETH_ADDRESS = '0x0000000000000000000000000000000000000000'
export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000'
export const MAX_UINT256 = BigNumber.from(2).pow(256).sub(1)
export const MAX_UINT160 = BigNumber.from(2).pow(160).sub(1)

export const SENDER_AS_RECIPIENT = '0x0000000000000000000000000000000000000001'
export const ROUTER_AS_RECIPIENT = '0x0000000000000000000000000000000000000002'

export const OPENSEA_CONDUIT_SPENDER_ID = 0
export const SUDOSWAP_SPENDER_ID = 1
