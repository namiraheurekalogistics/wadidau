import React, { useEffect, useState } from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";

import CustomScrollbars from "util/CustomScrollbars";
import SidebarLogo from "./SidebarLogo";
import UserProfile from "./UserProfile";
import AppsNavigation from "./AppsNavigation";
import {
  NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR,
  NAV_STYLE_NO_HEADER_MINI_SIDEBAR,
  THEME_TYPE_LITE,
} from "../../constants/ThemeSetting";
import IntlMessages from "../../util/IntlMessages";
import { useSelector } from "react-redux";
const SubMenu = Menu.SubMenu;

const SidebarContent = ({ sidebarCollapsed, setSidebarCollapsed }) => {
  const [role, setRole] = useState("operasional");
  const { navStyle, themeType } = useSelector(({ settings }) => settings);
  const pathname = useSelector(({ common }) => common.pathname);

  const getNoHeaderClass = (navStyle) => {
    if (
      navStyle === NAV_STYLE_NO_HEADER_MINI_SIDEBAR ||
      navStyle === NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR
    ) {
      return "gx-no-header-notifications";
    }
    return "";
  };

  const selectedKeys = pathname.substr(1);
  const defaultOpenKeys = selectedKeys.split("/")[1];

  useEffect(() => {
    setRole(localStorage.getItem("role"));
  }, []);

  return (
    <>
      <SidebarLogo
        sidebarCollapsed={sidebarCollapsed}
        setSidebarCollapsed={setSidebarCollapsed}
      />
      <div className="gx-sidebar-content">
        <div
          className={`gx-sidebar-notifications ${getNoHeaderClass(navStyle)}`}
        >
          <UserProfile />
          <AppsNavigation />
        </div>
        <CustomScrollbars className="gx-layout-sider-scrollbar">
          <Menu
            defaultOpenKeys={[defaultOpenKeys]}
            selectedKeys={[selectedKeys]}
            theme={themeType === THEME_TYPE_LITE ? "lite" : "dark"}
            mode="inline"
          >
            <div
              className="buttons-container"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <a href="/addnewso">
                <button
                  className="new-so-button"
                  style={{
                    backgroundColor: "orange",
                    color: "white",
                    width: "120px",
                    height: "40px",
                    border: "none",
                    borderRadius: "20px",
                    marginBottom: "10px",
                  }}
                >
                  NEW SO
                </button>
              </a>

              <a href="/addnewsp">
                <button
                  className="new-sp-button"
                  style={{
                    backgroundColor: "red",
                    color: "white",
                    width: "120px",
                    height: "40px",
                    border: "none",
                    borderRadius: "20px",
                  }}
                >
                  NEW SP
                </button>
              </a>

              <a href="/addnewap">
                <button
                  className="new-sp-button"
                  style={{
                    backgroundColor: "green",
                    color: "white",
                    width: "120px",
                    height: "40px",
                    border: "none",
                    borderRadius: "20px",
                    marginTop: 10,
                  }}
                >
                  NEW AP
                </button>
              </a>
            </div>

            <Menu.Item key="sample">
              <Link to="/sample">
                <i className="icon icon-widgets" />
                <span>Dasbhoard</span>
              </Link>
            </Menu.Item>

            <Menu.Item key="aplist">
              <Link to="/aplist">
                <i className="icon icon-add" />
                <span>AP List</span>
              </Link>
            </Menu.Item>

            <SubMenu
              key="ap"
              icon={<i className="icon icon-dasbhoard" />}
              title="AP Lain-lain"
            >
              <Menu.Item key="apaddon">
                <Link to="/apaddon">
                  <i className="icon icon-alert-new" />
                  <span>AP Addon</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="appersonal">
                <Link to="/appersonal">
                  <i className="icon icon-all-contacts" />
                  <span>AP Personal</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="appengajuanservice">
                <Link to="/appengajuanservice">
                  <i className="icon icon-amchart" />
                  <span>AP Pengajuan Service</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="appermohonanbiaya">
                <Link to="/appermohonanbiaya">
                  <i className="icon icon-anchor" />
                  <span>AP Permohonan Biaya</span>
                </Link>
              </Menu.Item>
            </SubMenu>

            {role !== "operasional" ? (
              <>
                <Menu.Item key="penerimaaninv">
                  <Link to="/penerimaaninv">
                    <i className="icon icon-add-circle" />
                    <span>Penerimaan Inv</span>
                  </Link>
                </Menu.Item>

                <Menu.Item key="akuntingprofit">
                  <Link to="/akuntingprofit">
                    <i className="icon icon-affix" />
                    <span>Akunting Profit</span>
                  </Link>
                </Menu.Item>
              </>
            ) : null}

            <SubMenu
              key="sp"
              icon={<i className="icon icon-arrow-left" />}
              title="SP"
            >
              <Menu.Item key="splist">
                <Link to="/splist">
                  <i className="icon icon-apps" />
                  <span>SP List</span>
                </Link>
              </Menu.Item>
            </SubMenu>

            <SubMenu
              key="sm"
              icon={<i className="icon icon-arrow-right" />}
              title="SM"
            >
              <Menu.Item key="smlist">
                <Link to="/smlist">
                  <i className="icon icon-attachment" />
                  <span>SM List</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="smlistnew">
                <Link to="/smlistnew">
                  <i className="icon icon-auth-screen" />
                  <span>SM List New</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="smreal">
                <Link to="/smreal">
                  <i className="icon icon-autocomplete" />
                  <span>SM Real</span>
                </Link>
              </Menu.Item>
            </SubMenu>

            <Menu.Item key="tarifpelanggan">
              <Link to="/tarifpelanggan">
                <i className="icon icon-alert" />
                <span>Tarif Pelanggan</span>
              </Link>
            </Menu.Item>

            <SubMenu
              key="spk"
              icon={<i className="icon icon-avatar" />}
              title="SPK"
            >
              <Menu.Item key="spkapproved">
                <Link to="/spkapproved">
                  <i className="icon icon-backtop" />
                  <span>SPK Approved</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="waitingspk">
                <Link to="/waitingspk">
                  <i className="icon icon-badge" />
                  <span>Waiting SPK</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="spklist">
                <Link to="/spklist">
                  <i className="icon icon-basic-calendar" />
                  <span>SPK List</span>
                </Link>
              </Menu.Item>
            </SubMenu>
            <SubMenu
              key="myreport"
              icon={<i className="icon icon-birthday" />}
              title="My Report"
            >
              <Menu.Item key="reportcust">
                <Link to="/reportcust">
                  <i className="icon icon-birthday-new" />
                  <span>Report Customer</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="reportsales">
                <Link to="/reportsales">
                  <i className="icon icon-bitcoin" />
                  <span>Report Sales</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="losesales">
                <Link to="/losesales">
                  <i className="icon icon-breadcrumb" />
                  <span>Lose Sales</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="reportspapprove">
                <Link to="/reportspapprove">
                  <i className="icon icon-breadcrumb" />
                  <span>SP Approve</span>
                </Link>
              </Menu.Item>
            </SubMenu>

            <SubMenu
              key="lainlain"
              icon={<i className="icon icon-burger" />}
              title="Lain-lain"
            >
              <Menu.Item key="deliveryschedule">
                <Link to="/deliveryschedule">
                  <i className="icon icon-button" />
                  <span>Delivery Schedule</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="pengajuanansurasi">
                <Link to="/pengajuanansuransi">
                  <i className="icon icon-calendar" />
                  <span>Pengajuan Ansuransi</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="marketingschedule">
                <Link to="/marketingschedule">
                  <i className="icon icon-calendar-new" />
                  <span>Marketing Schedule</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="pengajuaninternal">
                <Link to="/pengajuaninternal">
                  <i className="icon icon-callout" />
                  <span>Pengajuan Internal</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="customerrequest">
                <Link to="/customerrequest">
                  <i className="icon icon-camera" />
                  <span>Customer Request</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="blogartikel">
                <Link to="/blogartikel">
                  <i className="icon icon-camera-2" />
                  <span>Blog Artikel</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="blogimage">
                <Link to="/blogimage">
                  <i className="icon icon-card" />
                  <span>Blog Image</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="blogpartial">
                <Link to="/blogpartial">
                  <i className="icon icon-cards-list-view" />
                  <span>Blog Partial</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="blogsubpartial">
                <Link to="/blogsubpartial">
                  <i className="icon icon-carousel" />
                  <span>Blog Sub Partial</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="chatinternal">
                <Link to="/chatinternal">
                  <i className="icon icon-cascader" />
                  <span>Chat Internal</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="commentinternal">
                <Link to="/commentinternal">
                  <i className="icon icon-chart" />
                  <span>Comment Internal</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="eurekamap">
                <Link to="/eurekamap">
                  <i className="icon icon-chart-area" />
                  <span>Eureka Map</span>
                </Link>
              </Menu.Item>
            </SubMenu>

            <SubMenu
              key="mastercustomers"
              icon={<i className="icon icon-chart-area-new" />}
              title="Master Customer"
            >
              <Menu.Item key="mastercustomer">
                <Link to="/mastercustomer">
                  <i className="icon icon-chart-bar" />
                  <span>Master Customer</span>
                </Link>
              </Menu.Item>
              {/* <Menu.Item key="masteraddress">
                <Link to="/masteraddress">
                  <i className="icon icon-chart-bar" />
                  <span>Master Address Customer</span>
                </Link>
              </Menu.Item> */}
            </SubMenu>
            <SubMenu
              key="myunit"
              icon={<i className="icon icon-chart-composed" />}
              title="My Unit"
            >
              <Menu.Item key="vehiclestatus">
                <Link to="/vehiclestatus">
                  <i className="icon icon-chart-line" />
                  <span>Vehicle Status</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="vehicleready">
                <Link to="/vehicleready">
                  <i className="icon icon-chart-pie" />
                  <span>Vehicle Ready</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="unitmitra">
                <Link to="/unitmitra">
                  <i className="icon icon-chart-radar" />
                  <span>Unit Mitra</span>
                </Link>
              </Menu.Item>
            </SubMenu>
            <Menu.Item key="tarifpelanggan">
              <Link to="/tarifpelanggan">
                <i className="icon icon-chart-radial" />
                <span>Tarif Pelanggan</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="cancelmassage">
              <Link to="/cancelmassage">
                <i className="icon icon-chart-radial" />
                <span>Cancel Massage</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="masteralamat">
              <Link to="/masteralamat">
                <i className="icon icon-chart-radial" />
                <span>Master Alamat</span>
              </Link>
            </Menu.Item>
            <SubMenu
              key="masterbu"
              icon={<i className="icon icon-chart-scatter" />}
              title="Master BU"
            >
              <Menu.Item key="businessunit">
                <Link to="/businessunit">
                  <i className="icon icon-chart-tree" />
                  <span>Business Unit</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="pengguna">
                <Link to="/pengguna">
                  <i className="icon icon-charvlet-down" />
                  <span>Pengguna</span>
                </Link>
              </Menu.Item>
            </SubMenu>
          </Menu>
        </CustomScrollbars>
      </div>
    </>
  );
};

export default React.memo(SidebarContent);
