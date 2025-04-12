<template>
	<v-container fluid class="d-flex flex-column align-center justify-center" :class="xs ? 'xs' : ''">
		<div class="animate__animated animate__lightSpeedInRight animate__delay-1s">ODB-II Code Lookup</div>
		<v-autocomplete v-model="query" bg-color="yellow" :class="xs ? 'w-100' : 'w-75'" class="mt-4" rounded="lg" variant="solo" return-object label="Enter any ODB-II code (e.g. P0420)" :items="codes" />
		<div v-if="result" class="text-center">
			<h2 class="mb-4 animate-bounce">{{ result.title }}</h2>
			<component style="font-size: 1rem" :is="result.value" />
			Recommended OBD-II Scanners
			<div class="d-flex w-100 mt-4 justify-center">
				<a v-for="product in products" :key="product.id" :href="product.link" target="_blank" rel="noopener noreferrer" class="mr-2">
					<v-img :src="`/products/${product.asin}/image.webp`" width="200" height="200" />
                    <v-chip class="mt-2 text-body-2" color="yellow-darken-2">{{ Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(product.price) }}</v-chip>
				</a>
			</div>
		</div>
		<div v-else-if="!query" class="mt-4 animate__animated animate__flipInX" :class="xs ? 'w-100' : 'w-75'" :key="taglines[0]">{{ taglines[0] }}</div>
		<div v-else-if="query" class="mt-4">Code not recognized.</div>
	</v-container>
</template>
<style scoped>
.xs :deep(.v-label.v-field-label) {
	font-size: 0.5rem;
}
</style>
<script setup>
import { computed, ref, onMounted } from 'vue'
import { useDisplay } from 'vuetify'

const modules = import.meta.glob('./codes/*.vue', { eager: true })
console.log(modules)
const { xs } = useDisplay()
const query = ref()
const codes = computed(() => Object.keys(modules).map(title => ({
    title: title.split('/').pop().replace('.vue', ''),
    value: modules[title].default
})) || [])
const products = ref([
	{ id: 0, link: 'https://amzn.to/3Rek2XC', asin: 'B0CTHJW813', price: '219.99' },
	{ id: 1, link: 'https://amzn.to/3XXfqcl', asin: 'B007XE8C74', price: '29.99' },
    { id: 2, link: 'https://amzn.to/42r3qkz', asin: 'B07Q5H7M5S', price: '19.99' },
])
const taglines = ref([
	'The Best OBD-II Scanner Lookup Tool In The Entire Observable Universe',
	'Trusted by 9 Out of 10 Fictional Mechanics',
	'The Only OBD Tool Page You’ll Ever Need (Until You Need Another One)',
	'World-Class Diagnostics. Questionable Credibility.',
	'Better Than Talking to Your Car... Barely.',
	'AI-Powered. Mechanic-Approved. Reality-Optional.',
	'Scan Codes. Clear Codes. Impress Your Friends.',
	'Like a Mechanic in Your Browser—If That Mechanic Only Knew 5 Codes',
])

const shuffleTaglines = () => {
	for (let i = taglines.value.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1))
		;[taglines.value[i], taglines.value[j]] = [taglines.value[j], taglines.value[i]]
	}
}

const result = computed(() => codes.value?.find(c => c.title.toLowerCase() === query.value?.title.toLowerCase()))

onMounted(() => {
	shuffleTaglines()
	setInterval(() => {
		const first = taglines.value.shift()

		taglines.value.push(first)
	}, 5000)
})
</script>
