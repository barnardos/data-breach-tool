const answersTaggedWith = (answers, questionsTaggedWith, questionValue) => {
  const answerValues = Object.values(answers);

  return answerValues.length > 0
    ? answerValues.filter(
        ({ tags, value }) =>
          value === questionValue &&
          tags &&
          questionsTaggedWith.every(tag => tags.includes(tag))
      ).length
    : 0;
};

const answersTaggedWithKeys = (
  questionsTaggedWith,
  questionValue,
  questionsAndAnswers
) => {
  const answerValues = Object.values(questionsAndAnswers);

  if (answerValues.length > 0) {
    let matchingAnswers = answerValues.filter(({ tags, value }) => {
      let answer =
        value === questionValue &&
        tags &&
        questionsTaggedWith.every(tag => tags.includes(tag));
      return answer;
    });

    return matchingAnswers;
  } else {
    return 0;
  }
};

export const isObject = item => {
  return item && typeof item === "object" && !Array.isArray(item);
};

export const mergeDeep = (target, source) => {
  let output = Object.assign({}, target);
  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach(key => {
      if (isObject(source[key])) {
        if (!(key in target)) Object.assign(output, { [key]: source[key] });
        else output[key] = mergeDeep(target[key], source[key]);
      } else {
        Object.assign(output, { [key]: source[key] });
      }
    });
  }
  return output;
};

export const isNode = () => module.exports;

export const extractLinkText = str => str.replace(/<a[^>]*>(.*?)<\/a>/gi, "$1");

export const shouldIncludeReason = (
  sectionId,
  answer,
  excludeReasonsFromResults
) =>
  !excludeReasonsFromResults[sectionId] ||
  (excludeReasonsFromResults[sectionId] &&
    excludeReasonsFromResults[sectionId].answersDifferentThan.includes(answer));

export default function doConditionsPass(conditions = [], answers) {
  const testedConditions = conditions
    .map(
      ({
        type,
        equals,
        greaterThan,
        lessThan,
        questionId,
        questionsTaggedWith,
        questionValue,
        required
      }) => {
        let result;
        if (!questionsTaggedWith && !answers[questionId]) {
          return {
            result: false,
            required
          };
        }

        switch (type) {
          case "equals":
            result = answers[questionId].value === questionValue;
            break;
          case "doesNotEqual":
            result = answers[questionId].value !== questionValue;
            break;
          case "didNotAnswer":
            result = !answers[questionId].value;
            break;
          case "answersTaggedWithEquals":
            result =
              answersTaggedWith(answers, questionsTaggedWith, questionValue) ===
              equals;
            break;
          case "answersTaggedWithGreaterThan":
            result =
              answersTaggedWith(answers, questionsTaggedWith, questionValue) >
              greaterThan;
            break;
          case "answersTaggedWithLessThan":
            result =
              answersTaggedWith(answers, questionsTaggedWith, questionValue) <
              lessThan;
            break;
          default:
            result = false;
        }

        return {
          result,
          required
        };
      }
    )
    .filter(({ result, required }) => result || required);

  if (testedConditions.length < 1) {
    return false;
  }

  return testedConditions.every(({ result }) => result);
}

export function getQuestionAnswerReasons(conditions, questionsAndAnswers) {
  const testedConditions = conditions.map(
    ({
      type,
      equals,
      greaterThan,
      lessThan,
      questionId,
      questionsTaggedWith,
      questionValue
    }) => {
      let matchingAnswers = [];
      let passed = [];

      if (!questionsTaggedWith && !questionsAndAnswers[questionId]) {
        return {
          passed: []
        };
      }

      switch (type) {
        case "equals":
          if (questionsAndAnswers[questionId].value === questionValue)
            passed.push(questionsAndAnswers[questionId]);

          break;
        case "doesNotEqual":
          if (questionsAndAnswers[questionId].value !== questionValue)
            passed.push(questionsAndAnswers[questionId]);
          break;
        case "didNotAnswer":
          if (!questionsAndAnswers[questionId].value)
            passed.push(questionsAndAnswers[questionId]);
          break;
        case "answersTaggedWithEquals":
          matchingAnswers = answersTaggedWithKeys(
            questionsTaggedWith,
            questionValue,
            questionsAndAnswers
          );
          passed = matchingAnswers.length === equals ? matchingAnswers : false;
          break;
        case "answersTaggedWithGreaterThan":
          matchingAnswers = answersTaggedWithKeys(
            questionsTaggedWith,
            questionValue,
            questionsAndAnswers
          );

          passed =
            matchingAnswers.length > greaterThan ? matchingAnswers : false;

          break;
        case "answersTaggedWithLessThan":
          matchingAnswers =
            answersTaggedWithKeys(
              questionsTaggedWith,
              questionValue,
              questionsAndAnswers
            ) < lessThan;
          passed = matchingAnswers.length < lessThan ? matchingAnswers : false;

          break;
        default:
          return [];
      }

      return { passed };
    }
  );

  let reasons = [];

  testedConditions.forEach(test => {
    if (test.passed) {
      test.passed.forEach(passed => {
        reasons = [...reasons, passed];
      });
    }
  });

  return reasons;
}
