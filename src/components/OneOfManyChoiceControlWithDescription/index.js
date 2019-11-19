import React from "react";
import PropTypes from "prop-types";

import OfManyChoiceControl from "../OfManyChoiceControl";
import SinglelineTextControl from "../SinglelineTextControl";

const OneOfManyChoiceControlWithDescription = props => {
  const { additionalDescription, ...rest } = props;

  return (
    <React.Fragment>
      <OfManyChoiceControl type="one" {...rest} />
      <SinglelineTextControl
        {...rest}
        hint="Description (optional)"
        label=""
        size={64}
        optional={true}
        value={additionalDescription}
      />
    </React.Fragment>
  );
};

OneOfManyChoiceControlWithDescription.propTypes = {
  additionalDescription: PropTypes.string
};

export default OneOfManyChoiceControlWithDescription;
