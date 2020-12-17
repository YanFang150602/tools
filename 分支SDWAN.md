## 分支SDWAN

```JSON
{
  "vpnProfile": {
    "orgName": "cmcc_shanghai",
    "deviceName": "ShanghaiF310",
    "name": "ererer",
    "vpnType": "branch-sdwan",
    "tunnelInitiate": "",
    "hardwareAccelerator": "",
    "routingInstance": "Internet-Transport-VR",
    "branchSdwanProfile": "",
    "tunnelRoutingInstance": "cmcc_shanghai-Control-VR",
    "tunnelInterface": "ptvi29",
    "alarms": {
      "ipsecStateChange": "disable",
      "ikeStateChange": "disable",
      "ikeAuthFailure": "disable"
    },
    "local": {
      "address": "",
      "inet": "",
      "interfaceName": "vni-0/0.0",
      "hostname": ""
    },
    "peer": {
      "address": [
        "1.1.1.1"
      ],
      "inet": "1.1.1.1",
      "hostname": "",
      "peerFqdnList": []
    },
    "localAuthInfo": {
      "authType": "psk",
      "idType": "email",
      "key": "222",
      "idString": "223232",
      "caChain": "",
      "certDomain": "",
      "certName": ""
    },
    "peerAuthInfo": {
      "authType": "psk",
      "idType": "email",
      "idString": "23232",
      "key": "222",
      "caChain": ""
    },
    "ike": {
      "version": "",
      "mode": "",
      "group": "",
      "transform": "",
      "authDimain": "",
      "dpdTimeout": "",
      "lifetime": "",
      "hashAlgorithms": [],
      "encryptionAlgorithms": [],
      "groups": []
    },
    "ipsec": {
      "forceNatT": "",
      "fragmentation": "",
      "transform": "",
      "pfsGroup": "",
      "mode": "",
      "pfsGroups": [],
      "hashAlgorithms": [],
      "encryptionAlgorithms": [],
      "antiReplay": "",
      "keepaliveTimeout": "",
      "life": {
        "duration": "",
        "volume": ""
      }
    }
  }
}
```



## 控制器SDWAN

```json
{
  "vpnProfile": {
    "orgName": "yuff1023DesonOrg",
    "deviceName": "yuff1028D",
    "name": "5656",
    "vpnType": "controller-sdwan",
    "tunnelInitiate": "",
    "hardwareAccelerator": "",
    "routingInstance": "WAN1-Transport-VR",
    "branchSdwanProfile": "",
    "tunnelRoutingInstance": "yuff1023DesonOrg-Control-VR",
    "tunnelInterface": "tvi-0/335.0",
    "alarms": {
      "ipsecStateChange": "disable",
      "ikeStateChange": "disable",
      "ikeAuthFailure": "disable"
    },
    "local": {
      "address": "",
      "inet": "",
      "interfaceName": "vni-0/0.0",
      "hostname": ""
    },
    "peer": {
      "address": [],
      "inet": "",
      "hostname": "",
      "peerFqdnList": []
    },
    "localAuthInfo": {
      "authType": "",
      "idType": "",
      "key": "",
      "idString": "",
      "caChain": "",
      "certDomain": "",
      "certName": ""
    },
    "peerAuthInfo": {
      "authType": "cert",
      "idType": "",
      "idString": "",
      "key": "",
      "caChain": ""
    },
    "ike": {
      "version": "",
      "mode": "",
      "group": "",
      "transform": "",
      "authDimain": "",
      "dpdTimeout": "",
      "lifetime": "",
      "hashAlgorithms": [],
      "encryptionAlgorithms": [],
      "groups": [
        "Email"
      ]
    },
    "ipsec": {
      "forceNatT": "",
      "fragmentation": "",
      "transform": "",
      "pfsGroup": "",
      "mode": "",
      "pfsGroups": [],
      "hashAlgorithms": [],
      "encryptionAlgorithms": [],
      "antiReplay": "",
      "keepaliveTimeout": "",
      "life": {
        "duration": "",
        "volume": ""
      }
    }
  }
}
```

