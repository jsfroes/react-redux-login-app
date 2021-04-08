exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
  };
  
  exports.influencerBoard = (req, res) => {
    res.status(200).send("Influencer Content.");
  };
  
  exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
  };
  
  exports.staffBoard = (req, res) => {
    res.status(200).send("Staff Content.");
  };