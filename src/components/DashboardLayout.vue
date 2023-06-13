<template>
  <div class="dashboard">
    <v-navigation-drawer
      v-model="drawer"
      mini-variant-width="73"
      :mini-variant.sync="mini"
      permanent
      app
      color="blue"
    >
      <v-list-item class="px-2 logo">
        <img src="../assets/logo_gym.png" alt="GOFIT GYM logo" />
        <span>GOFIT GYM</span>

        <v-btn icon @click.stop="mini = !mini">
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </v-list-item>

      <v-divider></v-divider>
      <v-list dense nav v-if="Login && LoginMO">
        <v-list-item
          v-for="item in MO"
          :key="item.title"
          link
          tag="router-link"
          :to="item.to"
        >
          <v-list-item-content>
            <v-list-item-title
              ><v-icon>{{ item.icon }}</v-icon>
              {{ item.title }}</v-list-item-title
            >
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-list dense nav v-else-if="Login && LoginKasir">
        <v-list-item
          v-for="item in Kasir"
          :key="item.title"
          link
          tag="router-link"
          :to="item.to"
        >
          <v-list-item-content>
            <v-list-item-title
              ><v-icon>{{ item.icon }}</v-icon>
              {{ item.title }}</v-list-item-title
            >
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-list dense nav v-else-if="Login && LoginAdmin">
        <v-list-item
          v-for="item in Admin"
          :key="item.title"
          link
          tag="router-link"
          :to="item.to"
        >
          <v-list-item-content>
            <v-list-item-title
              ><v-icon>{{ item.icon }}</v-icon>
              {{ item.title }}</v-list-item-title
            >
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app fixed height="75px">
      <!-- <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon> -->
      <VSpacer />
      <v-toolbar-items>
        <v-btn text router @click="btnLogout"
          ><v-icon color="red">mdi-power</v-icon></v-btn
        >
      </v-toolbar-items>
    </v-app-bar>
    <div class="fullheigh pa-2">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  name: "Dashboard",
  data() {
    return {
      drawer: true,
      MO: [
        {
          icon: "mdi-view-dashboard-variant",
          title: "Dashboard MO",
          to: "/dashboardmo",
        },
        {
          icon: "mdi-contacts",
          title: "Instruktur",
          to: "/instruktur",
        },
        {
          icon: "mdi-calendar-blank-multiple",
          title: "Jadwal Umum",
          to: "/jadwalumum",
        },
        {
          icon: "mdi-calendar-blank",
          title: "Jadwal Harian",
          to: "/jadwalharian",
        },
        {
          icon: "mdi-file-clock",
          title: "Izin Instruktur",
          to: "/izininstruktur",
        },
        {
          icon: "mdi-file-check",
          title: "Semua Izin Instruktur",
          to: "/izininstrukturterkonfirmasi",
        },
        {
          icon: "mdi-file-export",
          title: "Laporan",
          to: "/laporan",
        },
      ],
      Admin: [
        {
          icon: "mdi-view-dashboard-variant",
          title: "Dashboard Admin",
          to: "/dashboardadmin",
        },
        {
          icon: "mdi-contacts",
          title: "Instruktur",
          to: "/instruktur",
        },
        {
          icon: "mdi-calendar-blank-multiple",
          title: "Jadwal Umum",
          to: "/jadwalumum",
        },
        {
          icon: "mdi-calendar-blank",
          title: "Jadwal Harian",
          to: "/jadwalharian",
        },
        {
          icon: "mdi-file-clock",
          title: "Izin Instruktur",
          to: "/izininstruktur",
        },
        {
          icon: "mdi-file-check",
          title: "Semua Izin Instruktur",
          to: "/izininstrukturterkonfirmasi",
        },
        {
          icon: "mdi-file-export",
          title: "Laporan",
          to: "/laporan",
        },
        { icon: "mdi-card-account-details", title: "Member", to: "/member" },
        {
          icon: "mdi-card-bulleted-off",
          title: "Membership Kadaluarsa",
          to: "/membertidakaktif",
        },
        {
          icon: "mdi-credit-card",
          title: "Transaksi Aktivasi",
          to: "/transaksiaktivasi",
        },
        {
          icon: "mdi-credit-card-fast",
          title: "Transaksi Deposit Uang",
          to: "/transaksideposituang",
        },
        {
          icon: "mdi-credit-card-clock",
          title: "Transaksi Deposit Kelas",
          to: "/transaksidepositkelas",
        },
        {
          icon: "mdi-credit-card-remove",
          title: "Transaksi Deposit Kadaluarsa",
          to: "/transaksidepositkadaluarsa",
        },
        {
          icon: "mdi-account-arrow-left",
          title: "Presensi Member Gym",
          to: "/presensimembergym",
        },
        {
          icon: "mdi-account-arrow-left-outline",
          title: "Presensi Member Kelas",
          to: "/presensimemberkelas",
        },
      ],
      Kasir: [
        {
          icon: "mdi-view-dashboard-variant",
          title: "Dashboard Kasir",
          to: "/dashboardkasir",
        },
        { icon: "mdi-card-account-details", title: "Member", to: "/member" },
        {
          icon: "mdi-card-bulleted-off",
          title: "Membership Kadaluarsa",
          to: "/membertidakaktif",
        },
        {
          icon: "mdi-credit-card",
          title: "Transaksi Aktivasi",
          to: "/transaksiaktivasi",
        },
        {
          icon: "mdi-credit-card-fast",
          title: "Transaksi Deposit Uang",
          to: "/transaksideposituang",
        },
        {
          icon: "mdi-credit-card-clock",
          title: "Transaksi Deposit Kelas",
          to: "/transaksidepositkelas",
        },
        {
          icon: "mdi-credit-card-remove",
          title: "Transaksi Deposit Kadaluarsa",
          to: "/transaksidepositkadaluarsa",
        },
        {
          icon: "mdi-account-arrow-left",
          title: "Presensi Member Gym",
          to: "/presensimembergym",
        },
        {
          icon: "mdi-account-arrow-left-outline",
          title: "Presensi Member Kelas",
          to: "/presensimemberkelas",
        },
      ],
      mini: true,
    };
  },

  methods: {
    btnLogout() {
      localStorage.removeItem("email");
      localStorage.removeItem("token");
      localStorage.removeItem("id_member");
      localStorage.removeItem("id_instruktur");
      localStorage.removeItem("id_pegawai");
      localStorage.removeItem("nama");
      localStorage.removeItem("role");
      this.$router.push("/login");
    },
  },

  computed: {
    Login() {
      return localStorage.getItem("token") != null;
    },
    LoginMO() {
      localStorage.getItem("id_pegawai");
      return localStorage.getItem("role") == "MO";
    },
    LoginAdmin() {
      return localStorage.getItem("role") == "Admin";
    },
    LoginKasir() {
      localStorage.getItem("id_pegawai");
      return localStorage.getItem("role") == "Kasir";
    },
  },

  mounted() {
    if (localStorage.getItem("id_pegawai") != null) {
      this.$http
        .get(this.$api + "/pegawai/" + localStorage.getItem("id_pegawai"))
        .then((response) => {
          this.pegawai = response.data.data;
          this.nama = response.data.data.nama;
        })
        .catch((error) => {
          console.log(error);
        });
    }
  },
};
</script>
<style scoped>
.logo {
  display: flex;
  align-items: center;
  padding: 16px 0;
  font-weight: bold;
  font-size: 18px;
  color: white;
}
.logo span {
  margin-left: 0px;
  color: white;
}
.logo img {
  height: 40px;
  margin-right: 8px;
}
</style>
