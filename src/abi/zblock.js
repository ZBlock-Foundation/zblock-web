export const address = "0x0f89F3E85925845640D04f4B3f11de700677AFb6";

export const ZBlock = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "communityIndex",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "communityFounder",
        type: "address",
      },
    ],
    name: "CommunityCreated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "Paused",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "Unpaused",
    type: "event",
  },
  {
    inputs: [],
    name: "paused",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "founder",
            type: "address",
          },
          {
            components: [
              {
                internalType: "string",
                name: "id",
                type: "string",
              },
              {
                internalType: "string",
                name: "name",
                type: "string",
              },
              {
                internalType: "string",
                name: "description",
                type: "string",
              },
              {
                internalType: "string",
                name: "website",
                type: "string",
              },
              {
                internalType: "string",
                name: "founderName",
                type: "string",
              },
              {
                internalType: "string",
                name: "founderEmail",
                type: "string",
              },
              {
                internalType: "string",
                name: "founderPhone",
                type: "string",
              },
            ],
            internalType: "struct Community.CommunityDetail",
            name: "detail",
            type: "tuple",
          },
          {
            internalType: "enum Community.CommunityType",
            name: "typeInfo",
            type: "uint8",
          },
          {
            internalType: "enum Community.CommunityPurpose[]",
            name: "purposes",
            type: "uint8[]",
          },
          {
            components: [
              {
                internalType: "string",
                name: "country",
                type: "string",
              },
              {
                internalType: "string",
                name: "city",
                type: "string",
              },
              {
                internalType: "string",
                name: "addressDetail",
                type: "string",
              },
            ],
            internalType: "struct Community.CommunityAddress",
            name: "addressInfo",
            type: "tuple",
          },
          {
            components: [
              {
                internalType: "uint256",
                name: "minLockingDate",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "maxLockingDate",
                type: "uint256",
              },
            ],
            internalType: "struct Community.CommunityFundLocking",
            name: "fundLocking",
            type: "tuple",
          },
          {
            components: [
              {
                internalType: "uint256",
                name: "targetAmount",
                type: "uint256",
              },
              {
                internalType: "enum Community.ReleaseFund",
                name: "releaseFund",
                type: "uint8",
              },
              {
                internalType: "address payable",
                name: "securityManager",
                type: "address",
              },
            ],
            internalType: "struct Community.CommunityFundReleasing",
            name: "fundReleasing",
            type: "tuple",
          },
        ],
        internalType: "struct Community.CommunityInfo",
        name: "_communityInfo",
        type: "tuple",
      },
    ],
    name: "newCommunity",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "communityList",
    outputs: [
      {
        internalType: "contract Community[]",
        name: "",
        type: "address[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
