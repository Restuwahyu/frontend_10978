import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);
function importComponent(path) {
  return () => import(`../components/${path}.vue`);
}

const router = new VueRouter({
  mode: "history",
  routes: [
    //login
    {
      path: "/",
      name: "Login",
      meta: { title: "GO FIT GYM" },
      component: importComponent("Login"),
    },
    {
      path: "/",
      component: importComponent("DashboardLayout"),
      children: [
        //Dashboard Admin
        {
          path: "/dashboardadmin",
          name: "Dashboard Admin",
          meta: { title: "Dashboard Admin" },
          component: importComponent("DashboardAdmin"),
        },
        //Dashboard Kasir
        {
          path: "/dashboardkasir",
          name: "Dashboard Kasir",
          meta: { title: "Dashboard Kasir" },
          component: importComponent("DashboardKasir"),
        },
        //Dashboard MO
        {
          path: "/dashboardmo",
          name: "Dashboard MO",
          meta: { title: "Dashboard MO" },
          component: importComponent("DashboardMo"),
        },
        //Dashboard Member
        {
          path: "/member",
          name: "Member",
          meta: { title: "Member" },
          component: importComponent("Member"),
        },
        //Dashboard Pegawai
        {
          path: "/pegawai",
          name: "Pegawai",
          meta: { title: "Pegawai" },
          component: importComponent("Pegawai"),
        },
        //Dashboard Instruktur
        {
          path: "/instruktur",
          name: "Instruktur ",
          meta: { title: "Instruktur" },
          component: importComponent("Instruktur"),
        },
        //Dashboard Jadwal Umum
        {
          path: "/jadwalumum",
          name: "Jadwal Umum",
          meta: { title: "Jadwal Umum" },
          component: importComponent("JadwalUmum"),
        },
        //Dashboard Jadwal Harian
        {
          path: "/jadwalharian",
          name: "Jadwal Harian",
          meta: { title: "Jadwal Harian" },
          component: importComponent("JadwalHarian"),
        },
        //Dashboard Transaksi Aktivasi
        {
          path: "/transaksiaktivasi",
          name: "Transaksi Aktivasi",
          meta: { title: "Transaksi Aktivasi" },
          component: importComponent("TransaksiAktivasi"),
        },
        //Dashboard Transaksi Deposit Uang
        {
          path: "/transaksideposituang",
          name: "Transaksi Deposit Uang",
          meta: { title: "Transaksi Deposit Uang" },
          component: importComponent("TransaksiDepositUang"),
        },
        //Dashboard Transaksi Deposit Kelas
        {
          path: "/transaksidepositkelas",
          name: "Transaksi Deposit Kelas",
          meta: { title: "Transaksi Deposit Kelas" },
          component: importComponent("TransaksiDepositKelas"),
        },
        //Dashboard Izin Instruktur
        {
          path: "/izininstruktur",
          name: "Izin Instruktur",
          meta: { title: "Izin Instruktur" },
          component: importComponent("IzinInstruktur"),
        },
        //Dashboard Izin Instruktur
        {
          path: "/izininstrukturterkonfirmasi",
          name: "Izin Instruktur Terkonfirmasi",
          meta: { title: "Izin Instruktur Terkonfirmasi" },
          component: importComponent("IzinInstrukturTerkonfirmasi"),
        },
        //Dashboard Member Tidak Aktif
        {
          path: "/membertidakaktif",
          name: "Member Tidak Aktif",
          meta: { title: "Membership Kadaluarsa" },
          component: importComponent("MemberTidakAktif"),
        },
        //Dashboard Transaksi Deposit Kelas Kadaluarsa
        {
          path: "/transaksidepositkadaluarsa",
          name: "Transaksi Deposit Kadaluarsa",
          meta: { title: "Transaksi Deposit Kadaluarsa" },
          component: importComponent("TransaksiDepositKadaluarsa"),
        },
        //Dashboard Presensi Member Gym
        {
          path: "/presensimembergym",
          name: "Presensi Member Gym",
          meta: { title: "Presensi Member Gym" },
          component: importComponent("PresensiGym"),
        },
        //Dashboard Presensi Member Kelas
        {
          path: "/presensimemberkelas",
          name: "Presensi Member Kelas",
          meta: { title: "Presensi Member Kelas" },
          component: importComponent("PresensiKelas"),
        },
        //Dashboard Laporan
        {
          path: "/laporan",
          name: "Laporan",
          meta: { title: "Laporan" },
          component: importComponent("Laporan"),
        },
      ],
    },

    {
      path: "*",
      redirect: "/",
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (
    (to.name == "Dashboard" && localStorage.getItem("token") == null) ||
    (to.name == "Pegawai" && localStorage.getItem("token") == null) ||
    (to.name == "Member" && localStorage.getItem("token") == null) ||
    (to.name == "JadwalUmum" && localStorage.getItem("token") == null) ||
    (to.name == "Instruktur" && localStorage.getItem("token") == null)
  ) {
    next("login");
    document.to.meta.title = "Login";
  }

  if (
    (to.name == "Pegawai" &&
      localStorage.getItem("role") != "Kasir" &&
      localStorage.getItem("token") == null) ||
    (to.name == "Member" &&
      localStorage.getItem("id_role") != "2" &&
      localStorage.getItem("token") == null) ||
    (to.name == "Role" &&
      localStorage.getItem("id_role") != "2" &&
      localStorage.getItem("token") == null)
  ) {
    next("dashboardpegawai");
    document.to.meta.title = "DashboardPegawai";
  }

  document.title = to.meta.title;
  next();
});

export default router;
