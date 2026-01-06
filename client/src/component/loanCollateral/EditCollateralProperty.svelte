<script>
  import Commercial from "./forms/Commercial.svelte";
  import Residential from "./forms/Residential.svelte";
  import AgriLand from "./forms/AgriLand.svelte";
  import OpenPlot from "./forms/OpenPlot.svelte";
  import { createEventDispatcher } from "svelte";
  import { onMount } from "svelte";
  import { masters } from "$appstore/store";
  import { P } from "flowbite-svelte";

  import propertyResidentialSuit from "$lib/validate/loanCollateral/propertyResidentialSuit";
  import propertyCommercialSuit from "$lib/validate/loanCollateral/propertyCommercialSuit";
  import propertyAgriLandSuit from "$lib/validate/loanCollateral/propertyAgriLandSuit";
  import propertyOpenPlotSuit from "$lib/validate/loanCollateral/propertyOpenPlotSuit";

  let resPropertyResidentialDetails = propertyResidentialSuit.get();
  let resPropertyCommercialDetails = propertyCommercialSuit.get();
  let resPropertyAgriLandDetails = propertyAgriLandSuit.get();
  let resPropertyOpenPlotDetails = propertyOpenPlotSuit.get();
  let residentialSubtype = "";

  export let isModalOpen = false;
  export let property;

  // export let data;
  // export let errors;
  // export let onInput;

  let propertyTypes = [];
  let dataLoaded = false;

  onMount(() => {
    propertyTypes = [...$masters.m_property_type].sort((a, b) => a.id - b.id);
    console.log("property: ", property);
    if (property.property_type == 1) {
      const { area, area_unit } = JSON.parse(property.description);
      residentialProperty = {
        unit_no: property.unit_no,
        survey_no: property.survey_no,
        street_address: property.street_address,
        dist_id: property.dist_id,
        taluka_id: property.taluka_id,
        place: property.place,
        pincode: property.pincode,
        area,
        area_unit,
        property_value: property.property_value,
        sub_property: property.sub_property,
      };
      console.log("residentialProperty: ", residentialProperty);
    } else if (property.property_type == 2) {
      const { area, area_unit } = JSON.parse(property.description);
      commercialProperty = {
        unit_no: property.unit_no,
        survey_no: property.survey_no,
        street_address: property.street_address,
        dist_id: property.dist_id,
        taluka_id: property.taluka_id,
        place: property.place,
        pincode: property.pincode,
        area,
        area_unit,
        property_value: property.property_value,
        sub_property: property.sub_property,
      };
      console.log("commercialProperty: ", commercialProperty);
    } else if (property.property_type == 3) {
      const { maj_unit, min_unit, area_unit } = JSON.parse(
        property.description
      );
      agriProperty = {
        survey_no: property.survey_no,
        dist_id: property.dist_id,
        taluka_id: property.taluka_id,
        village: property.place,
        pincode: property.pincode,
        maj_unit,
        min_unit,
        area_unit,
        property_value: property.property_value,
        sub_property: property.sub_property,
      };
      console.log("agriProperty: ", agriProperty);
    } else if (property.property_type == 4) {
      const { maj_unit, min_unit, area_unit } = JSON.parse(
        property.description
      );
      openProperty = {
        unit_no: property.unit_no,
        survey_no: property.survey_no,
        street_address: property.street_address,
        dist_id: property.dist_id,
        taluka_id: property.taluka_id,
        place: property.place,
        pincode: property.pincode,
        maj_unit,
        min_unit,
        area_unit,
        property_value: property.property_value,
        sub_property: property.sub_property,
      };
      console.log("openProperty: ", openProperty);
    }

    dataLoaded = true;
  });
  const dispatch = createEventDispatcher();

  const getResidentialProperty = () => {
    console.log("property_type: ", property.property_type);
    console.log("residentialProperty: ", residentialProperty);
    const {
      unit_no,
      survey_no,
      street_address,
      dist_id,
      taluka_id,
      place,
      pincode,
      area,
      area_unit,
      property_value,
      sub_property,
    } = residentialProperty;

    // reset saved values
    residentialProperty = {
      unit_no: "",
      survey_no: "",
      street_address: "",
      dist_id: 0,
      taluka_id: 0,
      place: "",
      pincode: "",
      area: "",
      area_unit: "",
      property_value: "",
      sub_property: "",
    };
    return {
      property_type: property.property_type,
      unit_no,
      survey_no,
      street_address,
      dist_id,
      taluka_id,
      place,
      pincode,
      description: JSON.stringify({ area, area_unit }),
      property_value,
      sub_property,
    };
  };
  const getCommercialProperty = () => {
    console.log("property_type: ", property.property_type);
    console.log("commercialProperty: ", commercialProperty);

    const {
      unit_no,
      survey_no,
      street_address,
      dist_id,
      taluka_id,
      place,
      pincode,
      area,
      area_unit,
      property_value,
      sub_property,
    } = commercialProperty;
    console.log(
      unit_no,
      survey_no,
      street_address,
      dist_id,
      taluka_id,
      place,
      pincode,
      area,
      area_unit,
      property_value,
      sub_property
    );
    // reset saved values
    commercialProperty = {
      unit_no: "",
      survey_no: "",
      street_address: "",
      dist_id: 0,
      taluka_id: 0,
      place: "",
      pincode: "",
      area: "",
      area_unit: "",
      property_value: "",
      sub_property: "",
    };
    return {
      property_type: property.property_type,
      unit_no,
      survey_no,
      street_address,
      dist_id,
      taluka_id,
      place,
      pincode,
      description: JSON.stringify({ area, area_unit }),
      property_value,
      sub_property,
    };
  };

  const getAgriProperty = () => {
    console.log("property_type: ", property.property_type);
    console.log("agriProperty: ", agriProperty);
    const {
      survey_no,
      dist_id,
      taluka_id,
      village,
      pincode,
      maj_unit,
      min_unit,
      area_unit,
      property_value,
      sub_property,
    } = agriProperty;

    // reset agriProperty
    agriProperty = {
      survey_no: "",
      dist_id: 0,
      taluka_id: 0,
      village: "",
      pincode: "",
      maj_unit: "",
      min_unit: "",
      area_unit: "",
      property_value: "",
      sub_property: "",
    };
    return {
      property_type: property.property_type,
      unit_no: "--",
      survey_no,
      street_address: "--",
      dist_id,
      taluka_id,
      place: village,
      pincode,
      description: JSON.stringify({ maj_unit, min_unit, area_unit }),
      property_value,
      sub_property,
    };
  };
  const getOpenProperty = () => {
    console.log("property_type: ", property.property_type);
    console.log("openProperty: ", openProperty);
    const {
      unit_no,
      survey_no,
      street_address,
      dist_id,
      taluka_id,
      place,
      pincode,
      maj_unit,
      min_unit,
      area_unit,
      property_value,
      sub_property,
    } = openProperty;

    openProperty = {
      unit_no: "",
      survey_no: "",
      street_address: "",
      dist_id: 0,
      taluka_id: 0,
      place: "",
      pincode: "",
      maj_unit: "",
      min_unit: "",
      area_unit: "",
      property_value: "",
      sub_property: "",
    };
    return {
      property_type: property.property_type,
      unit_no,
      survey_no,
      street_address,
      dist_id,
      taluka_id,
      place,
      pincode,
      description: JSON.stringify({ maj_unit, min_unit, area_unit }),
      property_value,
      sub_property,
    };
  };

  // const onSave = () => {
  //   let lProperty = {};
  //   if (property.property_type == 1) {
  //     lProperty = getResidentialProperty();
  //   } else if (property.property_type == 2) {
  //     lProperty = getCommercialProperty();
  //   } else if (property.property_type == 3) {
  //     lProperty = getAgriProperty();
  //   } else if (property.property_type == 4) {
  //     lProperty = getOpenProperty();
  //   }
  //   lProperty.id = property.id;
  //   lProperty.application_id = property.application_id;
  //   console.log("property begin save is: ", lProperty);
  //   dispatch("saveProperty", lProperty);
  //   isModalOpen = !isModalOpen;
  // };

  const toggleModal = () => {
    // property.property_type = 0;
    isModalOpen = !isModalOpen;
  };
  // Commercial

  let commercialProperty = {
    unit_no: "",
    survey_no: "",
    street_address: "",
    dist_id: 0,
    taluka_id: 0,
    place: "",
    pincode: "",
    area: "",
    area_unit: "",
    property_value: "",
    sub_property: "",
  };

  let commercialPropertyErrors = {
    unit_no: "",
    survey_no: "",
    street_address: "",
    dist_id: 0,
    taluka_id: 0,
    place: "",
    pincode: "",
    area: "",
    area_unit: "",
    property_value: "",
    sub_property: "",
  };

  let residentialProperty = {
    unit_no: "",
    survey_no: "",
    street_address: "",
    dist_id: 0,
    taluka_id: 0,
    place: "",
    pincode: "",
    area: "",
    area_unit: "",
    property_value: "",
    sub_property: "",
  };
  let residentialPropertyErrors = {
    unit_no: "",
    survey_no: "",
    street_address: "",
    dist_id: 0,
    taluka_id: 0,
    place: "",
    pincode: "",
    area: "",
    area_unit: "",
    property_value: "",
    sub_property: "",
  };

  let agriProperty = {
    survey_no: "",
    dist_id: 0,
    taluka_id: 0,
    village: "",
    pincode: "",
    maj_unit: "",
    min_unit: "",
    area_unit: "",
    property_value: "",
    sub_property: "",
  };

  let agriPropertyErrors = {
    survey_no: "",
    dist_id: 0,
    taluka_id: 0,
    village: "",
    pincode: "",
    maj_unit: "",
    min_unit: "",
    area_unit: "",
    property_value: "",
    sub_property: "",
  };

  let openProperty = {
    unit_no: "",
    survey_no: "",
    street_address: "",
    dist_id: 0,
    taluka_id: 0,
    place: "",
    pincode: "",
    maj_unit: "",
    min_unit: "",
    area_unit: "",
    property_value: "",
    sub_property: "",
  };

  let openPropertyErrors = {
    unit_no: "",
    survey_no: "",
    street_address: "",
    dist_id: 0,
    taluka_id: 0,
    place: "",
    pincode: "",
    maj_unit: "",
    min_unit: "",
    area_unit: "",
    property_value: "",
    sub_property: "",
  };

  const onSave = () => {
    let lProperty = {};
    if (property.property_type == 1) {
      clearErrors(residentialPropertyErrors);
      if (!onSubmit("residentialProperty")) return false;
      lProperty = getResidentialProperty();
      lProperty.application_id = property.application_id;
      lProperty.id = property.id;
      dispatch("saveProperty", lProperty);
    } else if (property.property_type == 2) {
      clearErrors(commercialPropertyErrors);
      if (!onSubmit("commercialProperty")) return false;
      lProperty = getCommercialProperty();
      lProperty.application_id = property.application_id;
      lProperty.id = property.id;
      dispatch("saveProperty", lProperty);
    } else if (property.property_type == 3) {
      clearErrors(agriPropertyErrors);
      if (!onSubmit("agriProperty")) return false;
      lProperty = getAgriProperty();
      lProperty.application_id = property.application_id;
      lProperty.id = property.id;
      dispatch("saveProperty", lProperty);
    } else if (property.property_type == 4) {
      clearErrors(openPropertyErrors);
      if (!onSubmit("openProperty")) return false;
      lProperty = getOpenProperty();
      lProperty.application_id = property.application_id;
      lProperty.id = property.id;
      dispatch("saveProperty", lProperty);
    }
    isModalOpen = !isModalOpen;
  };

  const onSubmit = (property_type) => {
    if (property_type == "residentialProperty") {
      clearErrors(residentialPropertyErrors);
      resPropertyResidentialDetails = propertyResidentialSuit(
        residentialProperty,
        "submit"
      );
      console.log(
        "residentialPropertyErrors: ",
        resPropertyResidentialDetails.errors
      );

      resPropertyResidentialDetails.errors.forEach((e) => {
        residentialPropertyErrors[e.fieldName] = e.message;
      });
      if (resPropertyResidentialDetails.errors.length) return false;
      return true;
    } else if (property_type == "commercialProperty") {
      clearErrors(commercialPropertyErrors);
      resPropertyCommercialDetails = propertyCommercialSuit(
        commercialProperty,
        "submit"
      );
      console.log(
        "commercialPropertyErrors: ",
        resPropertyCommercialDetails.errors
      );

      resPropertyCommercialDetails.errors.forEach((e) => {
        commercialPropertyErrors[e.fieldName] = e.message;
      });
      if (resPropertyCommercialDetails.errors.length) return false;
      return true;
    } else if (property_type == "agriProperty") {
      clearErrors(agriPropertyErrors);
      resPropertyAgriLandDetails = propertyAgriLandSuit(agriProperty, "submit");
      console.log("agriPropertyErrors: ", resPropertyAgriLandDetails.errors);

      resPropertyAgriLandDetails.errors.forEach((e) => {
        agriPropertyErrors[e.fieldName] = e.message;
      });
      if (resPropertyAgriLandDetails.errors.length) return false;
      return true;
    } else if (property_type == "openProperty") {
      clearErrors(openPropertyErrors);
      resPropertyOpenPlotDetails = propertyOpenPlotSuit(openProperty, "submit");
      console.log("openPropertyErrors: ", resPropertyOpenPlotDetails.errors);

      resPropertyOpenPlotDetails.errors.forEach((e) => {
        openPropertyErrors[e.fieldName] = e.message;
      });
      if (resPropertyOpenPlotDetails.errors.length) return false;
      return true;
    }
  };

  const clearErrors = (errors) => {
    const keys = Object.keys(errors);
    keys.forEach((key) => {
      errors[key] = "";
    });
  };

  let alertMsg = "";
  const onInputPropertyResidential = (fieldName) => {
    resPropertyResidentialDetails = propertyResidentialSuit(
      residentialProperty,
      fieldName
    );
    const keys = Object.keys(residentialPropertyErrors);
    keys.forEach((key) => {
      residentialPropertyErrors[key] = "";
    });

    resPropertyResidentialDetails.errors.forEach((e) => {
      residentialPropertyErrors[e.fieldName] = e.message;
    });
    residentialPropertyErrors = { ...residentialPropertyErrors };
    if (resPropertyResidentialDetails.errors.length > 0) {
      alertMsg = "Please attend to errors";
      return;
    }
  };

  const onInputPropertyCommercial = (fieldName) => {
    resPropertyCommercialDetails = propertyCommercialSuit(
      commercialProperty,
      fieldName
    );
    const keys = Object.keys(commercialPropertyErrors);
    keys.forEach((key) => {
      commercialPropertyErrors[key] = "";
    });

    resPropertyCommercialDetails.errors.forEach((e) => {
      commercialPropertyErrors[e.fieldName] = e.message;
    });
    commercialPropertyErrors = { ...commercialPropertyErrors };
    if (resPropertyCommercialDetails.errors.length > 0) {
      alertMsg = "Please attend to errors";
      return;
    }
  };

  const onInputPropertyAgriLand = (fieldName) => {
    resPropertyAgriLandDetails = propertyAgriLandSuit(agriProperty, fieldName);
    const keys = Object.keys(agriPropertyErrors);
    keys.forEach((key) => {
      agriPropertyErrors[key] = "";
    });

    resPropertyAgriLandDetails.errors.forEach((e) => {
      agriPropertyErrors[e.fieldName] = e.message;
    });
    agriPropertyErrors = { ...agriPropertyErrors };
    if (resPropertyAgriLandDetails.errors.length > 0) {
      alertMsg = "Please attend to errors";
      return;
    }
  };

  const onInputPropertyOpenPlot = (fieldName) => {
    resPropertyOpenPlotDetails = propertyOpenPlotSuit(openProperty, fieldName);
    const keys = Object.keys(openPropertyErrors);
    keys.forEach((key) => {
      openPropertyErrors[key] = "";
    });

    resPropertyOpenPlotDetails.errors.forEach((e) => {
      openPropertyErrors[e.fieldName] = e.message;
    });
    openPropertyErrors = { ...openPropertyErrors };
    if (resPropertyOpenPlotDetails.errors.length > 0) {
      alertMsg = "Please attend to errors";
      return;
    }
  };
</script>

<!-- Main modal -->
{#if dataLoaded}
  {#if isModalOpen}
    <div
      id="default-modal"
      tabindex="-1"
      aria-hidden="true"
      class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 bottom-0 z-50 flex justify-center items-center w-full md:inset-0 h-full bg-gray-900 bg-opacity-50 backdrop-blur-sm"
    >
      <div class="relative p-4 w-full max-w-2xl max-h-full">
        <!-- Modal content -->
        <div class="relative bg-white rounded-lg shadow">
          <!-- Modal header -->
          <div
            class="flex items-center justify-between p-4 md:p-5 border-b rounded-t"
          >
            <h3 class="text-xl font-semibold text-gray-900">
              Edit Collateral Property
            </h3>
            <button
              type="button"
              class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
              on:click={toggleModal}
            >
              <svg
                class="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span class="sr-only">Close modal</span>
            </button>
          </div>
          <!-- Modal body -->
          <div class="px-2 md:px-2 space-y-2">
            <form>
              <fieldset>
                <legend class="text-base font-medium text-gray-900 pb-2">
                  <span class="px-4"> Please select the property type: </span>
                </legend>

                <div class="mx-2 mb-4 space-y-2">
                  <!-- Commercial Property -->
                  <div
                    class="my-2 mx-2 md:mx-4 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2 bg-white border-2 border-gray-200 p-3 rounded"
                  >
                    {#each propertyTypes as prop, i}
                      <div
                        class={`flex flex-col flex-wrap items-center justify-center px-2 m-2 p-3 rounded shadow ${
                          property.property_type == prop.id
                            ? "bg-gray-200"
                            : "bg-gray-100"
                        }`}
                      >
                        <input
                          id={`${prop.id}${prop.eng_name}`}
                          name="property-type"
                          type="radio"
                          value={prop.id}
                          class="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500 mb-2"
                          bind:group={property.property_type}
                        />
                        <label
                          for={`${prop.id}${prop.eng_name}`}
                          class="ml-3 block text-sm font-medium text-gray-700"
                        >
                          {prop.eng_name}&nbsp;-&nbsp;{prop.dev_name}
                        </label>
                      </div>
                    {/each}
                  </div>
                </div>
                {#if property.property_type == 1}
                  <div class="mx-2 mb-4 space-y-2">
                    <legend
                      class="text-base font-medium text-gray-900 pb-2 px-4"
                    >
                      Please select the document type:
                      <span class="text-red-500">*</span><br />
                      <span class="text-sm text-gray-600 px-2"
                        >कृपया दस्तऐवज प्रकार निवडा</span
                      >
                    </legend>
                    <div
                      class="my-2 mx-2 md:mx-4 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2 bg-white border-2 border-gray-200 p-3 rounded"
                    >
                      {#each [{ id: "7/12", eng: "7/12", mar: "७/१२ उतारा" }, { id: "8A", eng: "8A", mar: "८अ उतारा" }, { id: "PR Card", eng: "PR Card", mar: "पीआर कार्ड" }, { id: "Assessment Utara / Index 2", eng: "Assessment Utara / Index 2", mar: "मूल्यमापन उतारा / अनुक्रमांक २" }] as subtype}
                        <div
                          class={`flex flex-col flex-wrap items-center justify-center px-2 m-2 p-3 rounded shadow ${
                            residentialProperty.sub_property === subtype.id
                              ? "bg-gray-200"
                              : "bg-gray-100"
                          }`}
                        >
                          <input
                            id={subtype.id}
                            name="residential-subtype"
                            type="radio"
                            value={subtype.id}
                            class="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500 mb-2"
                            bind:group={residentialProperty.sub_property}
                          />
                          <label
                            for={subtype.id}
                            class="ml-3 block text-sm font-medium text-gray-700 text-center"
                          >
                            {subtype.eng}<br />{subtype.mar}
                          </label>
                        </div>
                      {/each}
                    </div>
                  </div>

                  <Residential
                    bind:unit_no={residentialProperty.unit_no}
                    bind:survey_no={residentialProperty.survey_no}
                    bind:street_address={residentialProperty.street_address}
                    bind:dist_id={residentialProperty.dist_id}
                    bind:taluka_id={residentialProperty.taluka_id}
                    bind:place={residentialProperty.place}
                    bind:pincode={residentialProperty.pincode}
                    bind:area={residentialProperty.area}
                    bind:area_unit={residentialProperty.area_unit}
                    bind:property_value={residentialProperty.property_value}
                    bind:sub_property={residentialProperty.sub_property}
                    data={residentialProperty}
                    errors={residentialPropertyErrors}
                    onInput={onInputPropertyResidential}
                    {alertMsg}
                  />
                {:else if property.property_type == 2}
                  <div class="mx-2 mb-4 space-y-2">
                    <legend
                      class="text-base font-medium text-gray-900 pb-2 px-4"
                    >
                      Please select the document type:
                      <span class="text-red-500">*</span><br />
                      <span class="text-sm text-gray-600 px-2"
                        >कृपया दस्तऐवज प्रकार निवडा</span
                      >
                    </legend>
                    <div
                      class="my-2 mx-2 md:mx-4 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2 bg-white border-2 border-gray-200 p-3 rounded"
                    >
                      {#each [{ id: "7/12", eng: "7/12", mar: "७/१२ उतारा" }, { id: "8A", eng: "8A", mar: "८अ उतारा" }, { id: "PR Card", eng: "PR Card", mar: "पीआर कार्ड" }, { id: "Assessment Utara / Index 2", eng: "Assessment Utara / Index 2", mar: "मूल्यमापन उतारा / अनुक्रमांक २" }] as subtype}
                        <div
                          class={`flex flex-col flex-wrap items-center justify-center px-2 m-2 p-3 rounded shadow ${
                            commercialProperty.sub_property === subtype.id
                              ? "bg-gray-200"
                              : "bg-gray-100"
                          }`}
                        >
                          <input
                            id={subtype.id}
                            name="residential-subtype"
                            type="radio"
                            value={subtype.id}
                            class="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500 mb-2"
                            bind:group={commercialProperty.sub_property}
                          />
                          <label
                            for={subtype.id}
                            class="ml-3 block text-sm font-medium text-gray-700 text-center"
                          >
                            {subtype.eng}<br />{subtype.mar}
                          </label>
                        </div>
                      {/each}
                    </div>
                  </div>
                  <Commercial
                    bind:unit_no={commercialProperty.unit_no}
                    bind:survey_no={commercialProperty.survey_no}
                    bind:street_address={commercialProperty.street_address}
                    bind:dist_id={commercialProperty.dist_id}
                    bind:taluka_id={commercialProperty.taluka_id}
                    bind:place={commercialProperty.place}
                    bind:pincode={commercialProperty.pincode}
                    bind:area={commercialProperty.area}
                    bind:area_unit={commercialProperty.area_unit}
                    bind:property_value={commercialProperty.property_value}
                    bind:sub_property={commercialProperty.sub_property}
                    data={commercialProperty}
                    errors={commercialPropertyErrors}
                    onInput={onInputPropertyCommercial}
                    {alertMsg}
                  />
                {:else if property.property_type == 3}
                  <div class="mx-2 mb-4 space-y-2">
                    <legend
                      class="text-base font-medium text-gray-900 pb-2 px-4"
                    >
                      Please select the document type:
                      <span class="text-red-500">*</span><br />
                      <span class="text-sm text-gray-600 px-2"
                        >कृपया दस्तऐवज प्रकार निवडा</span
                      >
                    </legend>
                    <div
                      class="my-2 mx-2 md:mx-4 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2 bg-white border-2 border-gray-200 p-3 rounded"
                    >
                      {#each [{ id: "7/12", eng: "7/12", mar: "७/१२ उतारा" }, { id: "8A", eng: "8A", mar: "८अ उतारा" }, { id: "PR Card", eng: "PR Card", mar: "पीआर कार्ड" }, { id: "Assessment Utara / Index 2", eng: "Assessment Utara / Index 2", mar: "मूल्यमापन उतारा / अनुक्रमांक २" }] as subtype}
                        <div
                          class={`flex flex-col flex-wrap items-center justify-center px-2 m-2 p-3 rounded shadow ${
                            agriProperty.sub_property === subtype.id
                              ? "bg-gray-200"
                              : "bg-gray-100"
                          }`}
                        >
                          <input
                            id={subtype.id}
                            name="residential-subtype"
                            type="radio"
                            value={subtype.id}
                            class="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500 mb-2"
                            bind:group={agriProperty.sub_property}
                          />
                          <label
                            for={subtype.id}
                            class="ml-3 block text-sm font-medium text-gray-700 text-center"
                          >
                            {subtype.eng}<br />{subtype.mar}
                          </label>
                        </div>
                      {/each}
                    </div>
                  </div>
                  <AgriLand
                    bind:survey_no={agriProperty.survey_no}
                    bind:dist_id={agriProperty.dist_id}
                    bind:taluka_id={agriProperty.taluka_id}
                    bind:village={agriProperty.village}
                    bind:pincode={agriProperty.pincode}
                    bind:maj_unit={agriProperty.maj_unit}
                    bind:min_unit={agriProperty.min_unit}
                    bind:area_unit={agriProperty.area_unit}
                    bind:property_value={agriProperty.property_value}
                    bind:sub_property={agriProperty.sub_property}
                    data={agriProperty}
                    errors={agriPropertyErrors}
                    onInput={onInputPropertyAgriLand}
                    {alertMsg}
                  />
                {:else if property.property_type == 4}
                  <div class="mx-2 mb-4 space-y-2">
                    <legend
                      class="text-base font-medium text-gray-900 pb-2 px-4"
                    >
                      Please select the document type:
                      <span class="text-red-500">*</span><br />
                      <span class="text-sm text-gray-600 px-2"
                        >कृपया दस्तऐवज प्रकार निवडा</span
                      >
                    </legend>
                    <div
                      class="my-2 mx-2 md:mx-4 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2 bg-white border-2 border-gray-200 p-3 rounded"
                    >
                      {#each [{ id: "7/12", eng: "7/12", mar: "७/१२ उतारा" }, { id: "8A", eng: "8A", mar: "८अ उतारा" }, { id: "PR Card", eng: "PR Card", mar: "पीआर कार्ड" }, { id: "Assessment Utara / Index 2", eng: "Assessment Utara / Index 2", mar: "मूल्यमापन उतारा / अनुक्रमांक २" }] as subtype}
                        <div
                          class={`flex flex-col flex-wrap items-center justify-center px-2 m-2 p-3 rounded shadow ${
                            openProperty.sub_property === subtype.id
                              ? "bg-gray-200"
                              : "bg-gray-100"
                          }`}
                        >
                          <input
                            id={subtype.id}
                            name="residential-subtype"
                            type="radio"
                            value={subtype.id}
                            class="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500 mb-2"
                            bind:group={openProperty.sub_property}
                          />
                          <label
                            for={subtype.id}
                            class="ml-3 block text-sm font-medium text-gray-700 text-center"
                          >
                            {subtype.eng}<br />{subtype.mar}
                          </label>
                        </div>
                      {/each}
                    </div>
                  </div>
                  <OpenPlot
                    bind:unit_no={openProperty.unit_no}
                    bind:survey_no={openProperty.survey_no}
                    bind:street_address={openProperty.street_address}
                    bind:dist_id={openProperty.dist_id}
                    bind:taluka_id={openProperty.taluka_id}
                    bind:place={openProperty.place}
                    bind:pincode={openProperty.pincode}
                    bind:maj_unit={openProperty.maj_unit}
                    bind:min_unit={openProperty.min_unit}
                    bind:area_unit={openProperty.area_unit}
                    bind:property_value={openProperty.property_value}
                    bind:sub_property={openProperty.sub_property}
                    data={openProperty}
                    errors={openPropertyErrors}
                    onInput={onInputPropertyOpenPlot}
                    {alertMsg}
                  />
                {/if}
              </fieldset>
            </form>
          </div>
          <!-- Modal footer -->
          <div
            class="flex items-center justify-center p-4 md:p-5 border-t border-gray-200 rounded-b"
          >
            <button
              on:click={onSave}
              type="button"
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Save
            </button>
            <button
              on:click={toggleModal}
              type="button"
              class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  {/if}
{:else}
  ...Loading
{/if}
