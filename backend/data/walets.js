const wallets = [
  {
    user: '68126a5f169827da2ebdf609',
    balance: 500,
    transactions: [
      {
        type: "credit",
        amount: 500,
        description: "Initial deposit",
      },
    ],
  },
  {
    user: '68126a5f169827da2ebdf60a',
    balance: 1200,
    transactions: [
      {
        type: "credit",
        amount: 1000,
        description: "Referral bonus",
      },
      {
        type: "credit",
        amount: 200,
        description: "Item rental income",
      },
    ],
  },
  {
    user: '68126a5f169827da2ebdf608',
    balance: 150,
    transactions: [
      {
        type: "credit",
        amount: 200,
        description: "Top-up",
      },
      {
        type: "debit",
        amount: 50,
        description: "Item rental payment",
      },
    ],
  },
];

export default wallets;