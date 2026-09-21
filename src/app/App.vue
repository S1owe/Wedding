<script setup lang="ts">
import { ref } from 'vue';
import IntroLoader from '@layout/IntroLoader.vue';
import SiteHeader from '@layout/SiteHeader.vue';
import SiteFooter from '@layout/SiteFooter.vue';
import ScrollToTopButton from '@ui/ScrollToTopButton.vue';
import HeroSection from '@/components/pages/home/HeroSection.vue';
import GreetingSection from '@/components/pages/home/GreetingSection.vue';
import WeddingCalendar from '@/components/pages/home/WeddingCalendar.vue';
import VenueSection from '@/components/pages/home/VenueSection.vue';
import ProgramTimeline from '@/components/pages/home/ProgramTimeline.vue';
import GiftsSection from '@/components/pages/home/GiftsSection.vue';
import DressCodeSection from '@/components/pages/home/DressCodeSection.vue';
import SurprisesSection from '@/components/pages/home/SurprisesSection.vue';
import FaqSection from '@/components/pages/home/FaqSection.vue';
import RsvpForm from '@/components/pages/home/RsvpForm.vue';

// Сайт монтируется в момент, когда занавес прелоадера начинает расходиться,
// а сам прелоадер снимается только после того, как занавес полностью ушёл.
const isInvitationOpen = ref(false);
const isLoaderMounted = ref(true);
</script>

<template>
  <div class="wedding-invitation">
    <template v-if="isInvitationOpen">
      <SiteHeader />

      <main>
        <HeroSection />
        <GreetingSection />
        <WeddingCalendar />
        <VenueSection />
        <ProgramTimeline />
        <GiftsSection />
        <DressCodeSection />
        <SurprisesSection />
        <FaqSection />
        <RsvpForm />
      </main>

      <SiteFooter />
      <ScrollToTopButton />
    </template>

    <IntroLoader
      v-if="isLoaderMounted"
      @reveal="isInvitationOpen = true"
      @finished="isLoaderMounted = false"
    />
  </div>
</template>

<style lang="scss">
@use "../style/global";
</style>
