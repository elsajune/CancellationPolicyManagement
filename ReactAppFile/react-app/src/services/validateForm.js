export default function validateForm(policy) {
    let errors = {};
  
    if (!policy.policyName.trim()||(policy.policyName === "Enter policy name")) {
      errors.policyName = 'Policy Name required';
    }

    if (!policy.policyDescription.trim()||(policy.policyDescription === "Enter policy Description")) {
        errors.policyDescription = 'Policy Description required';
      }

    if(!policy.policySource.trim()){
      errors.policySource = "Select Policy Source"
    }
    
    return errors;
  }