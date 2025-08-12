const reports = [
  {
    reporter: "681341f308e7cd9877d588e6",
    reportedUser: "681341f308e7cd9877d588e7",
    item: "681341f308e7cd9877d588e9",
    booking: "6815525efecf99839b80628e",
    reason: "Inappropriate behavior",
    details: "The user was rude and unprofessional during the booking.",
    status: "pending",
  },
  {
    reporter: "681341f308e7cd9877d588e7",
    reportedUser: "681341f308e7cd9877d588e6",
    item: "681341f308e7cd9877d588ea",
    booking: "6815b5e6c260b1437c8b4b20",
    reason: "Item not as described",
    details: "The item was not in the condition described in the listing.",
    status: "reviewed",
  },
];


// MongoDB Connected: ac-qiw9u7t-shard-00-02.y4s8kls.mongodb.net
// ValidationError: rating: Path `rating` is required., owner: Path `owner` is required., reviewer: Path `reviewer` is required.
// melkien@melkien-HP-Pavilion-Laptop-15-eg2xxx:~/rentsmart$ 

// it says that the rating, owner, and reviewer are required fields in the report model
// but in the data, we are not providing them
// this is because the report model is not the same as the review model
// the report model has different fields and requirements
// so we need to make sure that the data we are providing matches the model
// and the requirements of the model
// the report model has the following fields:
// reporter, reportedUser, item, booking, reason, details, status
// and the reviewer, owner, and rating fields are not required in the report model
// so we need to remove them from the data
// and make sure that the data we are providing matches the model

//give me a dummy data for the report model

const newReports = [
  {
    reporter: "681341f308e7cd9877d588e6",
    reportedUser: "681341f308e7cd9877d588e7",
    item: "681341f308e7cd9877d588e9",
    booking: "6815525efecf99839b80628e",
    reason: "Inappropriate behavior",
    details: "The user was rude and unprofessional during the booking.",
    status: "pending",
  },
  {
    reporter: "681341f308e7cd9877d588e7",
    reportedUser: "681341f308e7cd9877d588e6",
    item: "681341f308e7cd9877d588ea",
    booking: "6815b5e6c260b1437c8b4b20",
    reason: "Item not as described",
    details: "The item was not in the condition described in the listing.",
    status: "reviewed",
  },
];

export default reports;
