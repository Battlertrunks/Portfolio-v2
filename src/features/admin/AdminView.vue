<script setup lang="ts">
import PageContainer from '@/components/PageContainer.vue';
import SectionHeading from '@/components/SectionHeading.vue';
import SectionItemForm from '@/components/SectionItemForm.vue';


</script>

<template>
  <PageContainer>
    <!-- TODO: Need to create a database to contain the following: -->
    <!-- 1. Education table 2. Job/professional experience 3. Projects -->
    <!-- About me (exception of Skills, maybe that can be a table, can be static on the frontend) -->
    <section class="py-16 sm:py24" aria-labelledby="admin-page">
      <SectionHeading
        heading-id="admin-title"
        eyebrow="Hello, Administrator"
        title="Edit your portfolio to your liking."
        :level="1"
        description="Edit your projects, experience, and education to paint a full picture for you."
      />

      <SectionItemForm />

    </section>
  </PageContainer>
</template>
