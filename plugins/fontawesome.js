import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faEdit,
  faTrash,
  faEye,
  faCopy,
  faPen
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faEye, faCopy, faPen);

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.component('font-awesome-icon', FontAwesomeIcon);
});
