/****************************
 * cloud functions list sidebar
 ***************************/

import {
  AddIcon,
  AttachmentIcon,
  HamburgerIcon,
  SettingsIcon,
  SunIcon,
  WarningIcon,
} from "@chakra-ui/icons";
import { Input } from "@chakra-ui/react";
import React from "react";

import styles from "./index.module.scss";
import commonStyles from "../../index.module.scss";

export default function FunctionList() {
  return (
    <div>
      <div className={commonStyles.sectionHeader + " flex justify-between"}>
        <h4>函数列表</h4>
        <div>
          <SunIcon />
          <AddIcon />
          <HamburgerIcon />
        </div>
      </div>
      <div className="flex items-center mb-2">
        <Input />
        <WarningIcon />
        <SettingsIcon />
      </div>

      <h5>我的收藏</h5>
      <ul className={styles.functionList + " mb-4"}>
        <li>
          <div>
            <AttachmentIcon />
            addToto.js
          </div>
          <div className={styles.status}>M</div>
        </li>
        <li>antDirt.js</li>
        <li>getUser.js</li>
        <li>getQrCode.js</li>
        <li>getUserInfo.js</li>
        <li>helloWorld.js</li>
      </ul>

      <h5>所有函数</h5>
      <ul>
        <li>addToto.js</li>
        <li>antDirt.js</li>
        <li>getUser.js</li>
        <li>getQrCode.js</li>
        <li>getUserInfo.js</li>
        <li>helloWorld.js</li>
      </ul>
    </div>
  );
}
