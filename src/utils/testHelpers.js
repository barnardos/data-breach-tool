const createObjectOfAnswers = (arrayLength, itemTag, itemValue) =>
  arrayLength > 0
    ? Object.assign(
        ...[...Array(arrayLength).keys()].map(item => ({
          [`${itemTag.join("-")}-${item}`]: {
            tags: [...itemTag],
            value: itemValue
          }
        }))
      )
    : { [`${itemTag.join("-")}-1`]: { tags: [], value: "" } };

export function passingConditionAnswer({
  type,
  equals,
  greaterThan,
  lessThan,
  questionId,
  questionsTaggedWith,
  questionValue
}) {
  switch (type) {
    case "equals":
      return {
        [questionId]: {
          value: questionValue,
          tags: []
        }
      };
    case "doesNotEqual":
      return {
        [questionId]: {
          value: `doesNotEqual__${questionValue}`,
          tags: []
        }
      };
    case "didNotAnswer":
      return {
        [questionId]: { value: "", tags: [] }
      };
    case "answersTaggedWithGreaterThan":
      return createObjectOfAnswers(
        greaterThan + 1,
        questionsTaggedWith,
        questionValue
      );
    case "answersTaggedWithEquals":
      return createObjectOfAnswers(equals, questionsTaggedWith, questionValue);
    case "answersTaggedWithLessThan":
      return createObjectOfAnswers(
        lessThan - 1,
        questionsTaggedWith,
        questionValue
      );
    default:
      return {};
  }
}

export function failingConditionAnswer({
  type,
  equals,
  lessThan,
  questionId,
  questionsTaggedWith,
  questionValue
}) {
  switch (type) {
    case "equals":
      return {
        [questionId]: {
          value: `doesNotEqual__${questionValue}`,
          tags: []
        }
      };
    case "doesNotEqual":
      return {
        [questionId]: {
          value: questionValue,
          tags: []
        }
      };
    case "didNotAnswer":
      return {
        [questionId]: {
          value: "questionIsAnswered",
          tags: []
        }
      };
    case "answersTaggedWithGreaterThan":
      return {
        [`${questionsTaggedWith.join("-")}-1`]: { value: "", tags: [] }
      };
    case "answersTaggedWithEquals":
      return createObjectOfAnswers(
        equals + 1,
        questionsTaggedWith,
        questionValue
      );
    case "answersTaggedWithLessThan":
      return createObjectOfAnswers(
        lessThan + 1,
        questionsTaggedWith,
        questionValue
      );
  }
}

const buildTableObject = sectionsData => {
  let resultsTableData = sectionsData.sections.find(
    section => section.type === "table"
  );
  let resultsTable = {};

  if (resultsTableData) {
    resultsTableData = resultsTableData.outputs[0].data.filter(
      row => row.rowParentTag !== "total"
    );
  } else {
    return {};
  }

  resultsTableData.forEach(({ rowParentTag, rowTags }, index) => {
    rowTags.forEach((tag, idx) => {
      resultsTable[`${rowParentTag}-${index}-${tag}-${idx}}`] = {
        tags: [rowParentTag, tag],
        value: "yes"
      };
    });
  });

  return resultsTable;
};

export const createMockAnswers = sectionsData => buildTableObject(sectionsData);
