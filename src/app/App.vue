<script setup lang="ts">
import { ref } from 'vue';
import EnvelopeLoader from '@layout/EnvelopeLoader.vue';
import CinematicBackground from '@layout/CinematicBackground.vue';
import ScrollToTopButton from '@ui/ScrollToTopButton.vue';
import HeroSection from '@/components/pages/home/HeroSection.vue';
import GreetingSection from '@/components/pages/home/GreetingSection.vue';
import WeddingCalendar from '@/components/pages/home/WeddingCalendar.vue';
import VenueSection from '@/components/pages/home/VenueSection.vue';
import ProgramTimeline from '@/components/pages/home/ProgramTimeline.vue';
import GiftsSection from '@/components/pages/home/GiftsSection.vue';
import DressCodeSection from '@/components/pages/home/DressCodeSection.vue';
import SurprisesSection from '@/components/pages/home/SurprisesSection.vue';
import RsvpForm from '@/components/pages/home/RsvpForm.vue';

const isInvitationOpen = ref(false);
</script>

<template>
  <div class="wedding-invitation">
    <CinematicBackground />
    <EnvelopeLoader v-if="!isInvitationOpen" @complete="isInvitationOpen = true" />

    <transition name="fadeSlow">
      <main v-if="isInvitationOpen" class="wedding-invitation__content">
        <HeroSection />
        <GreetingSection />
        <WeddingCalendar />
        <VenueSection />
        <ProgramTimeline />
        <GiftsSection />
        <DressCodeSection />
        <SurprisesSection />
        <RsvpForm />
      </main>
    </transition>

    <ScrollToTopButton v-if="isInvitationOpen" />
  </div>
</template>

<style lang="scss">
@use "@/style/variables/color.scss" as color;
@use "@/style/variables/transition.scss" as transition;
@use "../style/global";

.wedding-invitation__content {
  position: relative;
  z-index: 1;
}
</style>
