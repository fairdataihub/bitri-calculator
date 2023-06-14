<template>
  <main class="text-gray-800 mt-8">
    <h1>
      Calculator for the optimal diameter of a diseased bi/tri-furcation segment
    </h1>

    <n-divider />

    <p class="mb-4 text-2xl font-medium">
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
      <p class="text-2xl font-medium">
        Provide the units used for the diameters:
      </p>
      <n-select
        v-model:value="unit"
        :options="unitOptions"
        class="w-[150px]"
        size="large"
      />
    </div>

    <n-divider />

    <div class="flex flex-col mb-5">
      <p class="mb-3 text-2xl font-medium" v-if="mode === 'bifurcation'">
        Enter two of the three available diameters:
      </p>
      <p class="mb-3 text-2xl font-medium" v-else>
        Enter three of the four available diameters:
      </p>

      <!-- <n-divider /> -->

      <p class="text-base text-slate-600 font-normal">
        D<sub>m</sub> - Diameter of the mother segment
      </p>

      <p class="text-base text-slate-600 font-normal">
        D<sub>1</sub>, D<sub>2</sub
        ><span v-if="mode === 'trifurcation'">, D<sub>3</sub></span> - Diameter
        of the daughter segments
      </p>
    </div>

    <div class="flex flex-row justify-start items-start">
      <div class="flex flex-col">
        <div class="flex flex-row items-center space-x-4 my-4">
          <p class="text-xl font-medium w-[30px]">D<sub>m</sub></p>
          <n-input-number
            v-model:value="dm"
            clearable
            :placeholder="placeholder"
            :disabled="disableInput && (dm === undefined || dm === null)"
            size="large"
            :on-change="hideOutput"
          />
          <p class="text-lg font-normal w-[50px]">{{ unit }}</p>
        </div>

        <div class="flex flex-row items-center space-x-4 my-4">
          <p class="text-xl font-medium w-[30px]">D<sub>1</sub></p>
          <n-input-number
            v-model:value="d1"
            clearable
            :placeholder="placeholder"
            :disabled="disableInput && (d1 === undefined || d1 === null)"
            size="large"
            :on-change="hideOutput"
          />
          <p class="text-lg font-normal w-[50px]">{{ unit }}</p>
        </div>

        <div class="flex flex-row items-center space-x-4 my-4">
          <p class="text-xl font-medium w-[30px]">D<sub>2</sub></p>
          <n-input-number
            v-model:value="d2"
            clearable
            :placeholder="placeholder"
            :disabled="disableInput && (d2 === undefined || d2 === null)"
            size="large"
            :on-change="hideOutput"
          />
          <p class="text-lg font-normal w-[50px]">{{ unit }}</p>
        </div>

        <div
          class="flex flex-row items-center space-x-4 my-4"
          v-if="mode === 'trifurcation'"
        >
          <p class="text-xl font-medium w-[30px]">D<sub>3</sub></p>
          <n-input-number
            v-model:value="d3"
            clearable
            :placeholder="placeholder"
            :disabled="disableInput && (d3 === undefined || d3 === null)"
            size="large"
            :on-change="hideOutput"
          />
          <p class="text-lg font-normal w-[50px]">{{ unit }}</p>
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
      <p class="text-2xl font-bold">
        The suitable diameter for the
        <span>
          {{ output.label === "m" ? "mother" : "daughter" }} segment
        </span>
        <span
          >D<sub>{{ output.label }}</sub>
        </span>
        to achieve optimum blood flow is {{ output.val }} {{ unit }}.
      </p>

      <n-divider />
    </n-collapse-transition>

    <n-collapse-transition :show="showOutput">
      <p class="mb-4 text-lg font-semibold">How is it calculated?</p>

      <div
        class="w-full p-8 flex flex-col items-center bg-amber-50 rounded-lg text-2xl font-medium"
      >
        <p class="reference" v-if="mode == 'bifurcation'">
          The diameter to achieve optimal blood flow in the bifurcation is
          calculated based on the Huo-Kassab (HK) model
          <a
            href="https://doi.org/10.4244/EIJV7I11A206"
            target="_blank"
            rel="noopener"
            class="text-blue-400 hover:text-blue-600 transition-all hover:underline"
          >
            [1]
          </a>
        </p>
        <p class="reference" v-if="mode == 'trifurcation'">
          The diameter to achieve optimal blood flow in the trifurcation is
          calculated based on the Huo-Kassab (HK) model
          <a
            href="https://doi.org/10.4244/eijv11sva3"
            target="_blank"
            rel="noopener"
            class="text-blue-400 hover:text-blue-600 transition-all hover:underline"
          >
            [2]
          </a>
        </p>

        <p class="my-3">
          D<sub>m</sub><sup class="font-normal">7/3</sup> = D<sub>1</sub
          ><sup class="font-normal">7/3</sup> + D<sub>2</sub
          ><sup class="font-normal">7/3</sup>
          <span v-if="mode === 'trifurcation'">
            + D<sub>3</sub><sup class="font-normal">7/3</sup>
          </span>
        </p>

        <p class="my-3">
          <span v-if="dm">
            {{ dm }}
          </span>
          <span v-else> D<sub>m</sub> </span>
          <sup class="font-normal">7/3</sup> =
          <span v-if="d1">
            {{ d1 }}
          </span>
          <span v-else> D<sub>1</sub> </span
          ><sup class="font-normal">7/3</sup> +
          <span v-if="d2">
            {{ d2 }}
          </span>
          <span v-else> D<sub>2</sub> </span>
          <sup class="font-normal">7/3</sup>
          <span v-if="mode === 'trifurcation'">
            +
            <span v-if="d3">
              {{ d3 }}
            </span>
            <span v-else> D<sub>3</sub> </span>
            <sup class="font-normal">7/3</sup>
          </span>
        </p>

        <n-divider />

        <p class="my-4 text-3xl font-semibold">
          D<sub>{{ output.label }}</sub> = {{ output.val }} {{ unit }}
        </p>
      </div>
    </n-collapse-transition>
  </main>
</template>

<script setup lang="ts">
import { useMessage, NAlert } from "naive-ui";
import type { MessageRenderMessage } from "naive-ui";

const message = useMessage();

const unitOptions = [
  {
    label: "millimeters",
    value: "mm",
  },
  {
    label: "centimeters",
    value: "cm",
  },
  {
    label: "inches",
    value: "in",
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
  val: "",
});

const resetCalculation = (value: string) => {
  showOutput.value = false;

  dm.value = null;
  d1.value = null;
  d2.value = null;
  d3.value = null;

  mode.value = value;
};

const hideOutput = () => {
  showOutput.value = false;
};

const placeholder = computed(() => {
  if (disableInput.value) {
    return "";
  } else {
    return "Enter diameter";
  }
});

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

const renderMessage: MessageRenderMessage = (props) => {
  const { type } = props;
  return h(
    NAlert,
    {
      closable: props.closable,
      onClose: props.onClose,
      type: type === "loading" ? "default" : type,
      title: "Invalid Parameters",
      style: {
        boxShadow: "var(--n-box-shadow)",
        maxWidth: "calc(100vw - 32px)",
        width: "480px",
      },
    },
    {
      default: () => props.content,
    }
  );
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
    // if dm is lower than the other diameters, throw an error
    if (dm <= Math.max(...dx)) {
      message.error(
        "The diameter of the mother segment (Dm) should be greater than the daughter segment(s)",
        {
          render: renderMessage,
          closable: true,
        }
      );
      throw new Error("Dm must be greater than the other diameters");
    }

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
  const rightSide = [d1.value, d2.value, d3.value];

  // remove undefined values
  const dx = rightSide.filter((d) => d !== undefined && d !== null);

  const val = diameterCalculation(dm.value, dx);

  output.value.val = val.toFixed(2);

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

<style scoped>
.reference {
  @apply text-lg text-slate-600 font-medium mb-4;
}
</style>
