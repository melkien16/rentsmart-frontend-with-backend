const collaterals = [
  {
    user: "681341f308e7cd9877d588e7",
    collateralType: "ID",
    description: "National ID",
    value: 10000,
    documents: [
      {
        url: "https://example.com/id.jpg",
        fileType: "image",
      },
    ],
  },
  {
    user: "681341f308e7cd9877d588e6",
    collateralType: "Property",
    description: "House in Nairobi",
    value: 500000,
    documents: [
      {
        url: "https://example.com/property.jpg",
        fileType: "image",
      },
      {
        url: "https://example.com/property.pdf",
        fileType: "pdf",
      },
    ],
  },
];

export default collaterals;