<style>
@import url(https://fonts.cdnfonts.com/css/satoshi);

body,
html {
  font-family: 'Satoshi', sans-serif;
}
</style>

<template>
  <a-config-provider :theme="{
    token: {
      fontFamily: 'Satoshi',
      colorPrimary: '#2563EB',
    }
  }">

    <div>
      <Navbar />
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </div>
  </a-config-provider>

</template>
