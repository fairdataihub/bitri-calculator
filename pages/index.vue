<template>
  <main class="text-gray-800 mt-8">
    <h1>
      Calculator for the optimal diameter of a diseased bi/tri-furcation segment
    </h1>

    <n-divider />

    <h2 class="mb-8">
      Do you want to calculate the optimal diameter for a bifurcation or a
      trifurcation segment?
    </h2>

    <n-radio-group v-model:value="mode" name="modeSelector" size="large">
      <n-radio-button value="bifurcation"> Bifurcation </n-radio-button>
      <n-radio-button value="tifurcation"> Trifurcation </n-radio-button>
    </n-radio-group>

    <n-divider />

    <div class="flex justify-start items-center space-x-8">
      <h3>Provide the units used for the diameters:</h3>
      <n-select
        v-model:value="unit"
        :options="unitOptions"
        class="w-[100px]"
        size="large"
      />
    </div>

    <n-divider />

    <div class="flex flex-col mb-5">
      <h3 class="mb-4">Enter two of the three available diameters:</h3>

      <!-- <n-divider /> -->

      <p class="text-lg text-slate-600 font-normal">
        D<sub>m</sub> - Diameter of the mother segment
      </p>

      <p class="text-lg text-slate-600 font-normal">
        D<sub>1</sub>, D<sub>2</sub> - Diameter of the mother segment
      </p>
    </div>

    <div class="flex flex-row justify-start items-start">
      <div class="flex flex-col">
        <div class="flex flex-row items-center space-x-4 my-4">
          <p class="text-xl font-medium w-[30px]">D<sub>m</sub></p>
          <n-input-number
            v-model:value="dm"
            clearable
            :disabled="disableInput && (dm === undefined || dm === null)"
            size="large"
          />
          <p class="text-lg font-normal">{{ unit }}</p>
        </div>
        <div class="flex flex-row items-center space-x-4 my-4">
          <p class="text-xl font-medium w-[30px]">D<sub>1</sub></p>
          <n-input-number
            v-model:value="d1"
            clearable
            :disabled="disableInput && (d1 === undefined || d1 === null)"
            size="large"
          />
          <p class="text-lg font-normal">{{ unit }}</p>
        </div>
        <div class="flex flex-row items-center space-x-4 my-4">
          <p class="text-xl font-medium w-[30px]">D<sub>2</sub></p>
          <n-input-number
            v-model:value="d2"
            clearable
            :disabled="disableInput && (d2 === undefined || d2 === null)"
            size="large"
          />
          <p class="text-lg font-normal">{{ unit }}</p>
        </div>

        <div class="w-full flex my-6 justify-center">
          <n-button
            class=""
            size="large"
            type="primary"
            :class="{
              'animation-pulse': disableInput,
            }"
            @click="calculate"
            :disabled="!disableInput"
          >
            Calculate
          </n-button>
        </div>
      </div>

      <div class="ml-[200px]">
        <n-image
          width="200"
          src="https://f6publishing.blob.core.windows.net/a797ac81-d529-4743-83e2-7dd53df946a6/WJC-14-108-g001.png"
        />
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
const unitOptions = [
  {
    label: "mm",
    value: "mm",
  },
  {
    label: "cm",
    value: "cm",
  },
  {
    label: "m",
    value: "m",
  },
];

const mode = ref("bifurcation");
const unit = ref("mm");

const dm = ref();
const d1 = ref();
const d2 = ref();

const disableInput = computed(() => {
  // disable the input if two of the three diameters are provided
  const providedDiameters = [dm.value, d1.value, d2.value].filter(
    (d) => d !== undefined && d !== null
  );

  return providedDiameters.length === 2;
});

const emptyInput = (val: any) => {
  if (val === undefined || val === null) {
    return true;
  }
  return false;
};

const calculate = () => {
  if (emptyInput(dm.value)) {
    const val = Math.pow(d1.value, 7 / 3) + Math.pow(d2.value, 7 / 3);
    dm.value = val;
  } else if (emptyInput(d1.value)) {
    const val = Math.pow(dm.value, 7 / 3) - Math.pow(d2.value, 7 / 3);
    d1.value = val;
  } else if (emptyInput(d2.value)) {
    const val = Math.pow(dm.value, 7 / 3) - Math.pow(d1.value, 7 / 3);
    d2.value = val;
  }

  console.log(dm.value, d1.value, d2.value);
};
</script>
