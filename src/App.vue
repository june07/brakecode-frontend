<template>
	<v-app :class="{ mobile: xs }" style="max-width: 1920px; margin: 0 auto">
		<v-toolbar flat max-height="60px" class="mb-4">
			<v-toolbar-title>
				<v-icon color="yellow-darken-1 mt-1 mr-2" icon="mdi-pause" />
				<span class="roboto-flex-light font-italic text-uppercase font-weight-light">code</span>
			</v-toolbar-title>
		</v-toolbar>
		<v-main>
			<code-reader />
		</v-main>
		<nav-footer style="min-height: 500px" />
		<v-snackbar text :timeout="-1" v-model="snackbar.active" style="opacity: 0.95" @click="snackbarCloseHandler">
			<v-row>
				<v-col cols="1" class="d-flex align-center justify-center py-0">
					<v-icon :icon="snackbar.icon" :color="snackbar.iconColor" :size="smAndDown ? 'x-small' : 'x-large'" class="ml-2" />
				</v-col>
				<v-col cols="10" class="d-flex align-center justify-center py-0">
					<span v-if="snackbar.message" v-html="snackbar.message"></span>
					<span v-else @click="reload" class="font-weight-light" v-bind:class="smAndDown ? 'caption' : ''" style="cursor: pointer">App update available.</span>
				</v-col>
				<v-col cols="1" class="d-flex align-center justify-center py-0">
					<v-btn variant="plain" :size="smAndDown ? 'x-small' : 'default'" @click="snackbarCloseHandler" icon="mdi-close" />
				</v-col>
			</v-row>
		</v-snackbar>
	</v-app>
</template>
<style>
html,
body {
	overscroll-behavior-x: none;
	background: white;
	font-size: 1.4rem !important;
}
@media (max-width: 600px) {
	body {
		font-size: 0.75rem !important;
	}
}

.roboto-flex-light {
	font-family: 'Roboto Flex', sans-serif;
	font-optical-sizing: auto;
	font-weight: 300;
	font-style: normal;
	font-variation-settings: 'slnt' 0, 'wdth' 100, 'GRAD' 0, 'XOPQ' 96, 'XTRA' 468, 'YOPQ' 79, 'YTAS' 750, 'YTDE' -203, 'YTFI' 738, 'YTLC' 514, 'YTUC' 712;
}
.roboto-flex-medium {
	font-family: 'Roboto Flex', sans-serif;
	font-optical-sizing: auto;
	font-weight: 500;
	font-style: normal;
	font-variation-settings: 'slnt' 0, 'wdth' 100, 'GRAD' 0, 'XOPQ' 96, 'XTRA' 468, 'YOPQ' 79, 'YTAS' 750, 'YTDE' -203, 'YTFI' 738, 'YTLC' 514, 'YTUC' 712;
}
</style>
<script setup>
import { ref } from 'vue'
import { useDisplay } from 'vuetify/lib/framework.mjs'
import 'animate.css'

import NavFooter from '@/NavFooter.vue'
import CodeReader from '@/CodeReader.vue'

const { MODE } = import.meta.env
const { xs, smAndDown } = useDisplay()
const version = ref()
const snackbarDefault = {
	active: false,
	icon: 'mdi-update',
	message: undefined,
}
const snackbar = ref({ ...snackbarDefault })
const lastBuild = ref()
const versionCheckIntervalId = ref()
const buildInfo = ref()

function snackbarCloseHandler() {
	snackbar.value.active = false
	setTimeout(() => {
		snackbar.value = { ...snackbarDefault }
		if (error.value) {
			error.value = false
		}
	}, 500)
}
function reload() {
	const url = new URL(window.location.href)
	url.searchParams.set('cache', Date.now())
	window.location.href = url.toString()
}
async function getBuildInfo() {
	if (MODE !== 'production' && !/dev\./.test(window.location.host)) {
		return
	}
	try {
		const { data } = await fetch(`${window.origin}/build-info.json`, {
			headers: {
				'Cache-Control': 'no-store, max-age=0',
			},
		})
		return data
	} catch (error) {
		console.error(error)
	}
}
async function checkVersion() {
	buildInfo.value = await getBuildInfo()

	if (!buildInfo.value?.build_date) {
		return
	}
	version.value = buildInfo.value.commit_sha
	if (lastBuild.value && lastBuild.value?.build_date !== buildInfo.value.build_date) {
		snackbar.value.active = true
		// TODO: put some extra check here...
		resetLocalStorage.value = true
	} else {
		lastBuild.value = buildInfo.value
	}
}

checkVersion()
versionCheckIntervalId.value = setInterval(checkVersion, 60000)
</script>
