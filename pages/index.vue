<template>
  <main class="text-gray-800 mt-8">
    <h1>
      Calculator for the optimal diameter of a diseased bi/tri-furcation segment
    </h1>

    <n-divider />

    <p class="mb-4">
      Do you want to calculate the optimal diameter for a bifurcation or a
      trifurcation segment?
    </p>

    <n-radio-group
      v-model:value="mode"
      name="modeSelector"
      size="large"
      :on-update:value="resetCalculation"
    >
      <n-radio-button value="bifurcation"> Bifurcation </n-radio-button>
      <n-radio-button value="trifurcation"> Trifurcation </n-radio-button>
    </n-radio-group>

    <n-divider />

    <div class="flex justify-start items-center space-x-8">
      <p>Provide the units used for the diameters:</p>
      <n-select
        v-model:value="unit"
        :options="unitOptions"
        class="w-[100px]"
        size="large"
      />
    </div>

    <n-divider />

    <div class="flex flex-col mb-5">
      <p class="mb-4 text-2xl font-medium">
        Enter two of the three available diameters:
      </p>

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
            :on-change="hideOutput"
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
            :on-change="hideOutput"
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
            :on-change="hideOutput"
          />
          <p class="text-lg font-normal">{{ unit }}</p>
        </div>
        <div
          class="flex flex-row items-center space-x-4 my-4"
          v-if="mode === 'trifurcation'"
        >
          <p class="text-xl font-medium w-[30px]">D<sub>3</sub></p>
          <n-input-number
            v-model:value="d3"
            clearable
            :disabled="disableInput && (d3 === undefined || d3 === null)"
            size="large"
            :on-change="hideOutput"
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

    <n-collapse-transition :show="showOutput">
      <div
        class="w-full p-8 flex flex-col items-center bg-amber-50 rounded-lg text-2xl font-medium"
      >
        <p class="my-3">
          D <sub>m</sub> <sup>7/3</sup> = D <sub>1</sub> <sup>7/3</sup> + D
          <sub>2</sub> <sup>7/3</sup>
          <span v-if="mode === 'trifurcation'">
            + D <sub>3</sub> <sup>7/3</sup>
          </span>
        </p>

        <p class="my-3">
          <span v-if="dm">
            {{ dm }}
          </span>
          <span v-else> D <sub>m</sub> </span>
          <sup>7/3</sup> =
          <span v-if="d1">
            {{ d1 }}
          </span>
          <span v-else> D <sub>1</sub> </span> <sup>7/3</sup> +
          <span v-if="d2">
            {{ d2 }}
          </span>
          <span v-else> D <sub>2</sub> </span>
          <sup>7/3</sup>
          <span v-if="mode === 'trifurcation'">
            +
            <span v-if="d3">
              {{ d3 }}
            </span>
            <span v-else> D <sub>3</sub> </span> <sup>7/3</sup>
          </span>
        </p>

        <n-divider />

        <p class="my-4 text-3xl font-semibold">
          D<sub>{{ output.label }}</sub> = {{ output.val }}
        </p>
      </div>
    </n-collapse-transition>
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
const d3 = ref();

const showOutput = ref(false);

const output = ref({
  label: "",
  val: 0,
});

const resetCalculation = (value: string) => {
  showOutput.value = false;

  d3.value = undefined;

  mode.value = value;
};

const hideOutput = () => {
  showOutput.value = false;
};

const disableInput = computed(() => {
  // disable the input if two of the three diameters are provided

  if (mode.value === "bifurcation") {
    const providedDiameters = [dm.value, d1.value, d2.value].filter(
      (d) => d !== undefined && d !== null
    );

    return providedDiameters.length === 2;
  } else if (mode.value === "trifurcation") {
    const providedDiameters = [dm.value, d1.value, d2.value, d3.value].filter(
      (d) => d !== undefined && d !== null
    );

    return providedDiameters.length === 3;
  }
});

const emptyInput = (val: any) => {
  if (val === undefined || val === null) {
    return true;
  }
  return false;
};

const diameterCalculation = (dm: number, dx: number[]) => {
  if (dm === undefined || dm === null) {
    let rightSide = 0;

    dx.forEach((d) => {
      if (d !== undefined && d !== null) {
        rightSide += Math.pow(d, 7 / 3);
      }
    });

    const val = Math.pow(rightSide, 3 / 7);

    return val;
  } else {
    let leftSide = Math.pow(dm, 7 / 3);
    let rightSide = 0;

    dx.forEach((d) => {
      if (d !== undefined && d !== null) {
        rightSide += Math.pow(d, 7 / 3);
      }
    });

    const val = Math.pow(leftSide - rightSide, 3 / 7);

    return val;
  }
};

const calculate = () => {
  const val = diameterCalculation(dm.value, [d1.value, d2.value, d3.value]);

  output.value.val = val;

  if (emptyInput(dm.value)) {
    output.value.label = "m";
  } else if (emptyInput(d1.value)) {
    output.value.label = "1";
  } else if (emptyInput(d2.value)) {
    output.value.label = "2";
  } else if (emptyInput(d3.value)) {
    output.value.label = "3";
  }

  showOutput.value = true;
};
</script>
