<template>
  <aside>
    <widgets-login v-if='!$auth.loggedIn' class='mb-8' />
    <widgets-online-users class='mb-4' v-if='$auth.loggedIn' />
    <widgets-latest-registered-users />
    <sidebar-footer />
  </aside>
</template>
