function getBelow(bloodTest) {
  return Math.round(
    Number(bloodTest.blood_test_component_normal_range.split("-")[0])
  );
}
function getOver(bloodTest) {
  return Math.round(
    Number(bloodTest.blood_test_component_normal_range.split("-")[1])
  );
}
function getRight(bloodTest) {
  return Math.round(
    Number(bloodTest.blood_test_component_normal_range.split("-")[1]) -
      Number(bloodTest.blood_test_component_normal_range.split("-")[0])
  );
}

export function getVisualizationData(bloodTests) {
  var data = [
    {
      name: bloodTests.blood_test_component_name,
      meas: bloodTests.blood_test_component_measurement,
      min: getBelow(bloodTests),
      good: getRight(bloodTests),
      max: getOver(bloodTests),
      desc: bloodTests.blood_test_component_description,
      val: Number(bloodTests.blood_tests_component_value),
      dr: bloodTests.doctor_name,
    },
  ];
  return data;
}
