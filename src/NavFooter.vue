<template>
	<v-container class="w-100 d-flex flex-column text-body-2 font-weight-light" style="height: 500px" :class="smAndDown ? 'py-0 pb-16' : 'pt-16 '">
		<div class="d-flex w-100 mt-auto">
			<v-spacer />
			<v-row class="w-50" :class="smAndDown ? '' : 'text-end'">
				<v-spacer />
				
				<v-col :cols="smAndDown ? 4 : 3" class="d-flex flex-column">
					<div class="roboto-flex-light pb-4">Legal</div>
                    <div class="d-flex flex-column links">
                        <a class="mb-4" href="https://june07.com/terms">Terms</a>
                        <a href="https://june07.com/privacy">Privacy</a>
                    </div>
				</v-col>
			</v-row>
		</div>
		<v-divider class="my-4" thickness="2" />
		<div class="d-flex text-grey" :class="smAndDown ? 'text-caption text-no-wrap flex-column' : ''">
			© 2025 June07
			<v-spacer />
			<div class="font-italic font-weight-light">Happy Graduation to You!</div>
		</div>
	</v-container>
</template>
<style scoped>
a {
	text-decoration: none;
	color: inherit;
}
.links {
    font-size: 0.5rem;
}
</style>
<script setup>
import { useDisplay } from 'vuetify/lib/framework.mjs'

const { smAndDown } = useDisplay()
</script>
