export const Community = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_founder",
        type: "address",
      },
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
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "getInfo",
    outputs: [
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
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
