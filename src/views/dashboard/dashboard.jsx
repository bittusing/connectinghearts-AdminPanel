import React, { useEffect, useState } from "react";
import AntdTable from "../../genericComponents/AntdTable";
import { postRequest } from "../../configs/apis/axiosService";
import { Button, Tag, Tooltip } from "antd";
import dayjs from "dayjs"
import { deleteUser, getAllMembership, getCityLookup, getCountryLabel, getStateLookup, getVerifyUser, grantMembership } from "./apiServices"
import { getAllUsers } from "./apiServices";
import { useDispatch, useSelector } from "react-redux";
import AntdGenericDialog from "../../genericComponents/AntdGenericDilaog";
import { DeleteFilled, DeleteOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import appConfig from "../../configs/appConfig";
import LightboxGallery from "./galleryModal";
import { saveAllLocations, saveCountryLookup, saveLookupData } from "../../redux/slices/lookup";
import MembershipPlanModal from "./MembershipPlanModal";
import { defaultSort } from "../../helpers/utilities";

const Dashboard = () => {
  const dispatch = useDispatch();
  const [tableData, setTableData] = useState([]);
  const [tableFullData, setTableFullData] = useState([]);
  const [profileId, setProfileId] = useState();
  const [memberId, setMemberId] = useState();
  const [isVerifyModalVisible, setIsVerifyModalVisible] = useState(false);
  const [loader, setLoader] = useState(false);
  const [userType, setUserType] = useState("unverified");
  const [picsGallery, setPicsGallery] = useState([]);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [visibleMembership, setVisibleMembership] = useState(false);
  const [memberShipList, setMemberShipList] = useState([]);
  const [location, setLocation] = useState({});
  const [cities, setCities] = useState({});
  const [phone, setPhone] = useState();
  const [sortConfig, setSortConfig] = useState({ key: null, order: "asc" });
  const [isShowDelete, setIsShowDelete] = useState(false);

  useEffect(() => {
    fetchAllUserProfiles(userType);
  }, [userType]);

  useEffect(() => {
    fetchAllMembershipList();
  }, []);

  const lookup = useSelector((state) => state?.lookupReducer?.lookupData);
  // const location = useSelector((state) => state?.lookupReducer?.locationHashmap);
  // const savedCountry = useSelector(
  //   (state) => state?.lookupReducer?.savedCountryLookup
  // );

  const fetchAllUserProfiles = async (type) => {
    try {
      let response = await getAllUsers(type);
      let usersData = response?.data.map(item => {
        let pd = item?.personalDetails?.length ? item?.personalDetails[0] : {};
        let qualification = pd.education?.qualification ?? "";
        let aboutEducation = pd.education?.aboutEducation ?? "";
        let otherUGDegree = pd.education?.otherUGDegree ?? "";
        let school = pd.education?.school ?? "";
        const cleanedSrcmData = item?.srcmDetails?.map(({ _id, __v, ...rest }) => rest);
        let srcm = cleanedSrcmData[0] ? cleanedSrcmData[0] : {}
        let userDetail = { ...item, ...pd, ...srcm, qualification, aboutEducation, otherUGDegree,school };
        for(let key in userDetail){
          userDetail[key] = fetchLabelfromLookup(userDetail[key], key)
        }
        console.log({ userDetail });
        return userDetail // { ...item, ...pd, ...srcm, qualification, aboutEducation, otherUGDegree,school }
      });
      let country = [];
      let state = [];
      let cities = [];
      console.log("usersData==? ", usersData);
      //  let countries = usersData?.map(item => {
      //     if (item?.country) country.push(item?.country)
      //     if (item?.state) state.push(item?.state)
      //     if (item?.city) cities.push(item?.city)
      //   }) 
      let unique_country = [...new Set(usersData?.map(item => item?.country).filter(country => country !== undefined))];
      let unique_state = [...new Set(usersData?.map(item => item?.state).filter(state => state !== undefined))];
      let unique_cities = [...new Set(usersData?.map(item => item?.city).filter(city => city !== undefined))];

      console.log({ unique_country, unique_state, unique_cities });
      let allCountryLookup = await getCountryLabel();
      let allcontry = allCountryLookup?.data?.filter(item => {
        return unique_country?.includes(item?.value)
      });
      let locationHash = {}
      let citiHashmap = []
      let all_city = await Promise.all(allcontry?.map(async (item) => {
        let allState = await getStateLookup(item?.value);
        let allStateData = allState?.data[0]?.states;
        locationHash[item?.value] = { id: item?.value, label: item?.label };
        let allCity
        let allSelectedState = allStateData?.forEach(async state => {
          if (unique_state?.includes(state?.value)) {
            locationHash[item?.value][state?.value] = { id: state?.value, label: state?.label }
            // let getAllCity = await getCityLookup(state?.value);
            // let allCitiesData = getAllCity?.data[0]?.cities;
            // allCitiesData.forEach(city => {
            //   if (unique_cities?.includes(city?.value)) {
            //      console.log( city );
            //     locationHash[item?.value][state?.value][city?.value] = { id: city?.value, label: city?.label }
            //     // citiHashmap[city?.value] = { id: city?.value, label: city?.label };
            //      citiHashmap.push(city)
            //   }
            // })
          }
        });
        return item
      }));
      let citiesss = [];
      let getAllCity = await Promise.all(unique_state?.map(async (state) => {
        if (state) {
          let allcity = await getCityLookup(state);
          let allCitiesData = allcity?.data[0]?.cities;
          console.log(`Cities for ${state}:`, allCitiesData);
          allCitiesData?.forEach(city => {
            if (unique_cities?.includes(city?.value)) {
              console.log("matched", city);
              citiesss.push(city);
            }
          });
        }
      }));

      console.log("Matching cities:", citiesss);

      console.log({ citiesss });
      console.log("1", { citiHashmap });

      console.log({ usersData, unique_country, unique_state, unique_cities, allcontry, locationHash, citiHashmap });
      // console.log("locationHash===", JSON.stringify(locationHash)); 
      let table_data = usersData?.map((item) => {
        let country = item?.country ? locationHash[item.country]?.label : "";
        let state = (item?.country && item?.state) ? locationHash[item.country][item.state]?.label : "";
        let cityObject = citiesss?.find(cityObj => cityObj?.value == item?.city);
        let city = cityObject?.label || ""
        return { ...item, key:item?.heartsId, country, state, city };
      });
      let myTableData = [...table_data]
      setTableData(myTableData);
      setTableFullData(myTableData);
    } catch (err) {
      console.log(err);
    }
  };
  const fetchAllMembershipList = async () => {
    try {
      let response = await getAllMembership();
      setMemberShipList(response?.data)
    } catch (err) {
      console.error(err);
    }
  }
  const membershipGrant = async (membership_id) => {
    try {
      let body = {
        "membership_id": membership_id,
        "user_id": memberId,
      }
      console.log(body);
      let response = await grantMembership(body);
      console.log(response);
      toast.success(response?.data?.message);
      closeMembershipModal();
      fetchAllUserProfiles(userType)

    } catch (err) {
      console.error(err);
    }
  }

  // const fetchCountryLabel = async (countryId) => {
  //   let storedCountryData = [...savedCountry];
  //   let savedCountryObj = storedCountryData?.find(item => item?.value == countryId);
  //   if (savedCountryObj) {
  //     console.log(savedCountryObj?.label);
  //     return savedCountryObj?.label;
  //   } else {
  //     try {
  //       let response = await getCountryLabel();
  //       let countryData = response?.data?.find((item) => item.value == countryId);
  //       storedCountryData.push(countryData);
  //       dispatch(saveCountryLookup(storedCountryData));
  //       console.log(countryData?.label);
  //       return countryData?.label
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   }

  // }
  // const fetchCountryLabel = async (countryId) => {
  //   let storedCountryData = [...savedCountry];
  //   let savedCountryObj = storedCountryData?.find(item => item?.value == countryId);
  //   if (savedCountryObj) {
  //     return savedCountryObj?.label;
  //   } else {
  //     try {
  //       let response = await getCountryLabel();
  //       let countryData = response?.data?.find((item) => item.value == countryId);
  //       storedCountryData.push(countryData);
  //       dispatch(saveCountryLookup(storedCountryData));
  //       return countryData?.label;
  //     } catch (err) {
  //       console.error(err);
  //       return "Error"; // Provide an appropriate default value
  //     }
  //   }
  // };

  const fetchCountryLabel = (countryId) => {
    // let allLocations = JSON.parse(location);
    return location[countryId]?.label ?? "";
  }
  const fetchStateLabel = (countryId, stateId) => {
    // let allLocations = JSON.parse(location);
    let stateObj = location[countryId] && location[countryId][stateId] || ""
    // console.log({stateObj});
    return stateObj?.label ?? "";
  }
  const fetchCityLabel = async (cityId) => {
    // let allLocations = JSON.parse(location); 
    // console.log({allLocations});
    let cityObj = await cities[cityId]?.label || "";
    // console.log(location[countryId][stateId][cityId]);
    console.log(cityObj);
    return cityObj;
  }
 const onModifiedkey = (key)=>{
  if(key == "cast"){
    return 'casts';
  }else if(key == 'horoscope'){
    return 'horoscopes';
  }else if(key == 'qualification'){
    return 'highestEducation';
  }
  return key;
 }
  const fetchLabelfromLookup = (value, key) => {
    let modifiedKey = onModifiedkey(key);
    if (lookup[modifiedKey]) {
      let findObj = lookup[modifiedKey].find(item => item.value == value);
      return findObj?.label;
    }
    return value || "";
  }

  const handleShowVerifyUser = (row) => {
    console.log(row);
    setProfileId(row?._id);
    setIsVerifyModalVisible(true)
  }
  const handleVerifyUser = async () => {
    try {
      let response = await getVerifyUser(profileId);
      if (response?.status == 200) {
        toast.success(response?.data?.message);
        setProfileId(null)
        setIsVerifyModalVisible(false)
        fetchAllUserProfiles(userType)
      }
    } catch (err) {

    }
  }

  const handleShowAllUser = () => {
    setUserType("all")
  }
  const handleShowGallery = (picArr,row) => {
    let userId = localStorage.getItem("user_id")
    let pics = picArr?.map((item) => {
      let pUrl = `${appConfig.apiUrl}profile/file/${row._id}/${item?.id}`
      return pUrl
    }) 
    setPicsGallery(pics)
    setIsOpen(true)
  }
  const handleShowSrcmId = (pirArr) => {
    setPicsGallery(pirArr)
    setIsOpen(true)
  }
  const handleShowMembershiModal = (row) => {
    setMemberId(row?._id);
    setVisibleMembership(true)
  }

  console.log("tabledatacheckiing", tableData);

  const handleShowDelete =(row)=>{
    setIsShowDelete(true);
    setPhone(row?.phoneNumber)
  }

  const column = [
    {
      title: "Profile Pic",
      dataIndex: "profilePic",
      // key: "profilePic",
      sorter:false,
      render: (picArr, row) => {
        let primary = picArr?.find(item => item.primary);
        let pUrl = `${appConfig.apiUrl}profile/file/${row?._id}/${primary?.id}`;
        return primary ? <a onClick={() => handleShowGallery(picArr,row)}><img src={primary ? pUrl : ""} width={50} /></a> : ""
      }
    },
    {
      title: "SRCM Pic ID",
      dataIndex: "srcmDetails",
      // key: "srcmDetails",
      sorter:false,
      render: (picArr, row) => {
        let picObj = picArr[0];
        let userId = localStorage.getItem("user_id")
        let pUrl = `${appConfig.apiUrl}srcmDetails/file/${picObj?.srcmIdFilename}` 
        return picObj ? <a onClick={() => handleShowSrcmId([pUrl])}> <img src={pUrl} width={50} /></a> : ""
      }
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      sorter: { compare: (a, b) => defaultSort(a, b, "createdAt") },
      render: (value) => {
        return value ? dayjs(value).format("YYYY-MM-DD HH:mm:ss") : ""
      }
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: { compare: (a, b) => defaultSort(a, b, "name") },
      render:(value)=>{ 
        return <Tooltip title={value} >{value && value?.length > 30 ? value?.substring(0, 30) + '...':value}</Tooltip>
      }
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      sorter: { compare: (a, b) => defaultSort(a, b, "phoneNumber") },
      render:(value)=>{ 
        return <Tooltip title={value} >{value && value?.length > 30 ? value?.substring(0, 30) + '...':value}</Tooltip>
      }
    },
    {
      title: "Gender",
      dataIndex: "gender",
      sorter: { compare: (a, b) => defaultSort(a, b, "gender") },
      key: "gender",
      render: (value) => {
        return value == 'M' ? "Male" : "Female"
      }
    },
    {
      title: "SRCM Id Number",
      dataIndex: "srcmIdNumber",
      key: "srcmIdNumber",
      sorter: { compare: (a, b) => defaultSort(a, b, "srcmIdNumber") },
      render:(value)=>{ 
        return <Tooltip title={value} >{value && value?.length > 30 ? value?.substring(0, 30) + '...':value}</Tooltip>
      }
    },
    {
      title: "Email ID",
      dataIndex: "email",
      key: "email",
      width:250,
      sorter: { compare: (a, b) => defaultSort(a, b, "email") },
      render:(value)=>{ 
        return <Tooltip title={value} >{value && value?.length > 30 ? value?.substring(0, 30) + '...':value}</Tooltip>
      }
    },
    {
      title: "Hearts ID",
      dataIndex: "heartsId",
      key: "heartsId",
      sorter: { compare: (a, b) => defaultSort(a, b, "heartsId") },
      render:(value)=>{ 
        return <Tooltip title={value} >{value && value?.length > 30 ? value?.substring(0, 30) + '...':value}</Tooltip>
      }
    },
   
    
    {
      title: "Preceptors Name",
      dataIndex: "preceptorsName",
      key: "preceptorsName",
      sorter: { compare: (a, b) => defaultSort(a, b, "preceptorsName") },
      render:(value)=>{ 
        return <Tooltip title={value} >{value && value?.length > 30 ? value?.substring(0, 30) + '...':value}</Tooltip>
      }
    },
   
    {
      title: "Preceptors Contact No.",
      dataIndex: "preceptorsContactNumber",
      key: "preceptorsContactNumber",
      sorter: { compare: (a, b) => defaultSort(a, b, "preceptorsContactNumber") },
      render:(value)=>{ 
        return <Tooltip title={value} >{value && value?.length > 30 ? value?.substring(0, 30) + '...':value}</Tooltip>
      }
    },
    {
      title: "Preceptors Email",
      dataIndex: "preceptorsEmail",
      key: "preceptorsEmail",
      sorter: { compare: (a, b) => defaultSort(a, b, "preceptorsEmail") },
      render:(value)=>{ 
        return <Tooltip title={value} >{value && value?.length > 30 ? value?.substring(0, 30) + '...':value}</Tooltip>
      }
    },

    {
      title: "Satsang Centre Name",
      dataIndex: "satsangCentreName",
      key: "satsangCentreName",
      sorter: { compare: (a, b) => defaultSort(a, b, "satsangCentreName") },
      render:(value)=>{ 
        return <Tooltip title={value} >{value && value?.length > 30 ? value?.substring(0, 30) + '...':value}</Tooltip>
      }
    },
    
    {
      title: "Alt. Phone Number",
      dataIndex: "altMobileNumber",
      sorter: { compare: (a, b) => defaultSort(a, b, "altMobileNumber") },
      key: "altMobileNumber",
      render:(value)=>{ 
        return <Tooltip title={value} >{value && value?.length > 30 ? value?.substring(0, 30) + '...':value}</Tooltip>
      }
    },
    {
      title: "Alt. Email ID",
      dataIndex: "alternateEmail",
      sorter: { compare: (a, b) => defaultSort(a, b, "alternateEmail") },
      key: "alternateEmail",
      render:(value)=>{ 
        return <Tooltip title={value} >{value && value?.length > 30 ? value?.substring(0, 30) + '...':value}</Tooltip>
      }
    },
    {
      title: "Landline",
      dataIndex: "landline",
      sorter: { compare: (a, b) => defaultSort(a, b, "landline") },
      key: "landline",
      render:(value)=>{ 
        return <Tooltip title={value} >{value && value?.length > 30 ? value?.substring(0, 30) + '...':value}</Tooltip>
      }
    },
    {
      title: "Description",
      dataIndex: "description",
      sorter: { compare: (a, b) => defaultSort(a, b, "description") },
      key: "description",
      width:200,
      render:(value)=>{ 
        return <Tooltip title={value} >{value && value?.length > 40 ? value?.substring(0, 40) + '...':value}</Tooltip>
      }
    },
    {
      title: "Date of Birth",
      dataIndex: "dob",
      sorter: { compare: (a, b) => defaultSort(a, b, "dob") },
      key: "dob",
      type:'date',
      render: (value) => {
        return value ? dayjs(value).format("YYYY-MM-DD") : ""
      }
    },
   
    {
      title: "Country",
      dataIndex: "country",
      sorter: { compare: (a, b) => defaultSort(a, b, "country") },
      key: "country",
      render:(value)=>{ 
        return <Tooltip title={value} >{value && value?.length > 30 ? value?.substring(0, 30) + '...':value}</Tooltip>
      }
    },
    {
      title: "State",
      dataIndex: "state",
      sorter: { compare: (a, b) => defaultSort(a, b, "state") },
      key: "state",
      render:(value)=>{ 
        return <Tooltip title={value} >{value && value?.length > 30 ? value?.substring(0, 30) + '...':value}</Tooltip>
      }
    },
    {
      title: "City",
      dataIndex: "city",
      sorter: { compare: (a, b) => defaultSort(a, b, "city") },
      key: "city",
      render:(value)=>{ 
        return <Tooltip title={value} >{value && value?.length > 30 ? value?.substring(0, 30) + '...':value}</Tooltip>
      }
    },
    {
      title: "Qualification",
      dataIndex: "qualification",
      key: "qualification",
      render:(value)=>{ 
        return <Tooltip title={value} >{value && value?.length > 30 ? value?.substring(0, 30) + '...':value}</Tooltip>
      }
    },

    {
      title: "About Education",
      dataIndex: "aboutEducation",
      sorter: { compare: (a, b) => defaultSort(a, b, "aboutEducation") },
      key: "aboutEducation",
      // sortOrder: sortConfig.key === "aboutEducation" ? sortConfig.order : undefined,
      render:(value)=>{ 
        return <Tooltip title={value} >{value && value?.length > 30 ? value?.substring(0, 30) + '...':value}</Tooltip>
      }
    },
    {
      title: "Other UG Degree",
      dataIndex: "otherUGDegree",
      sorter: { compare: (a, b) => defaultSort(a, b, "otherUGDegree") },
      key: "otherUGDegree",
      render:(value)=>{ 
        return <Tooltip title={value} >{value && value?.length > 30 ? value?.substring(0, 30) + '...':value}</Tooltip>
      }
    },
    {
      title: "School",
      dataIndex: "school",
      sorter: { compare: (a, b) => defaultSort(a, b, "school") },
      key: "school",
      render:(value)=>{ 
        return <Tooltip title={value} >{value && value?.length > 30 ? value?.substring(0, 30) + '...':value}</Tooltip>
      }
    },
    {
      title: "Marital Status",
      dataIndex: "maritalStatus",
      sorter: { compare: (a, b) => defaultSort(a, b, "maritalStatus") },
      key: "maritalStatus",
      render:(value)=>{ 
        return <Tooltip title={value} >{value && value?.length > 30 ? value?.substring(0, 30) + '...':value}</Tooltip>
      }
    },
    {
      title: "Employed In",
      dataIndex: "employed_in",
      sorter: { compare: (a, b) => defaultSort(a, b, "employed_in") },
      key: "employed_in",
      render:(value)=>{ 
        return <Tooltip title={value} >{value && value?.length > 30 ? value?.substring(0, 30) + '...':value}</Tooltip>
      }
    },
    {
      title: "Disability",
      dataIndex: "disability",
      sorter: { compare: (a, b) => defaultSort(a, b, "disability") },
      key: "disability",
      render:(value)=>{ 
        return <Tooltip title={value} >{value && value?.length > 30 ? value?.substring(0, 30) + '...':value}</Tooltip>
      }
    },

    {
      title: "Religion",
      dataIndex: "religion",
      sorter: { compare: (a, b) => defaultSort(a, b, "religion") },
      key: "religion",
      render:(value)=>{ 
        return <Tooltip title={value} >{value && value?.length > 30 ? value?.substring(0, 30) + '...':value}</Tooltip>
      }
    },
    {
      title: "Cast",
      dataIndex: "cast",
      sorter: { compare: (a, b) => defaultSort(a, b, "cast") },
      key: "cast",
      render:(value)=>{ 
        return <Tooltip title={value} >{value && value?.length > 30 ? value?.substring(0, 30) + '...':value}</Tooltip>
      }
    },
    {
      title: "Height",
      dataIndex: "height",
      sorter: { compare: (a, b) => defaultSort(a, b, "height") },
      key: "height",
      render:(value)=>{ 
        return <Tooltip title={value} >{value && value?.length > 30 ? value?.substring(0, 30) + '...':value}</Tooltip>
      }
    },
    {
      title: "Income",
      dataIndex: "income",
      sorter: { compare: (a, b) => defaultSort(a, b, "income") },
      key: "income",
      render:(value)=>{ 
        return <Tooltip title={value} >{value && value?.length > 30 ? value?.substring(0, 30) + '...':value}</Tooltip>
      }
    },
    {
      title: "Mother Tongue",
      dataIndex: "motherTongue",
      sorter: { compare: (a, b) => defaultSort(a, b, "motherTongue") },
      key: "motherTongue",
      render:(value)=>{ 
        return <Tooltip title={value} >{value && value?.length > 30 ? value?.substring(0, 30) + '...':value}</Tooltip>
      }
    },
    {
      title: "Occupation",
      dataIndex: "occupation",
      sorter: { compare: (a, b) => defaultSort(a, b, "occupation") },
      key: "occupation",
      render:(value)=>{ 
        return <Tooltip title={value} >{value && value?.length > 30 ? value?.substring(0, 30) + '...':value}</Tooltip>
      }
    },
    {
      title: "Manglik",
      dataIndex: "manglik",
      sorter: { compare: (a, b) => defaultSort(a, b, "manglik") },
      key: "manglik",
      render:(value)=>{ 
        return <Tooltip title={value} >{value && value?.length > 30 ? value?.substring(0, 30) + '...':value}</Tooltip>
      }
    },

    {
      title: "Organisation Name",
      dataIndex: "organisationName",
      sorter: { compare: (a, b) => defaultSort(a, b, "organisationName") },
      key: "organisationName",
      render:(value)=>{ 
        return <Tooltip title={value} >{value && value?.length > 30 ? value?.substring(0, 30) + '...':value}</Tooltip>
      }
    },
    {
      title: "Member Verify",
      dataIndex: "isVerified", 
      render: (value) => {
        return <Tag color={value ? "green" : 'red'}>{value ? "Verified" : 'Unverified'}</Tag>
      }
    },
    {
      title: "Action", 
      align: "right",
      fixed: 'right',
      width:320,
      render: (value, row) => {
        return <div style={{ display:'flex', justifyContent:'flex-end' }}>

          {!row.isVerified ? <Button onClick={() => handleShowVerifyUser(row)} style={{ borderRadius: 5, padding: 5 }} size="small" type="primary">Verify User</Button> : <Button onClick={() => handleShowMembershiModal(row)} style={{ borderRadius: 5, padding: 5, marginLeft: 10, background: '#7367f0', color: '#fff' }} size="small" type="default">Grant Membership</Button>}
          <Button style={{marginLeft:10}} onClick={()=>handleShowDelete(row)}><DeleteOutlined /> Delete User</Button>
        </div>
      }
    },
  ]

  const handleCloseconfimationModal = () => {
    setIsVerifyModalVisible(false);
    setProfileId(null)
  }
  const closeMembershipModal = () => {
    setVisibleMembership(false);
    setMemberId(null)
  }
  const handleDeleteConfirm = async()=>{
     try {
      let response = await deleteUser(phone);
      if (response?.status == 200) {
        toast.success(response?.data?.message); 
        setIsShowDelete(false)
        setPhone()
        fetchAllUserProfiles(userType)
      }
    } catch (err) {

    }
  }

  const DeleteModal = () => {
    return <div style={{ textAlign: 'center' }}>
      <DeleteOutlined style={{ color: 'red', fontSize: '4rem' }} />
      <h2 style={{ color: '#000' }}>Are you sure you want to delete this user ?</h2>
    </div>
  }


  const ConfirmationModal = () => {
    return <div style={{ textAlign: 'center' }}>
      <QuestionCircleOutlined style={{ color: 'red', fontSize: '4rem' }} />
      <h2 style={{ color: '#000' }}>Are you sure you want to verify this user ?</h2>
    </div>
  }

  console.log({ tableData });
  return (
    <div> 
      <AntdTable
        tableData={tableData}
        tableHeaders={column}
        setTableData={setTableData}
        tableFullData={tableFullData}
        handleShowAllUser={handleShowAllUser}
        userType={userType}
        loader={loader}
      />
      <AntdGenericDialog show={isVerifyModalVisible} handleClose={handleCloseconfimationModal} children={ConfirmationModal()} handleConfirm={handleVerifyUser} />
    
      <AntdGenericDialog show={isShowDelete} handleClose={()=>setIsShowDelete(false)} children={DeleteModal()} handleConfirm={handleDeleteConfirm} />
      <LightboxGallery
        picsGallery={picsGallery}
        photoIndex={photoIndex}
        setPhotoIndex={setPhotoIndex}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
      <MembershipPlanModal memberShipList={memberShipList} isOpen={visibleMembership} onCancel={closeMembershipModal} handleOk={membershipGrant} />
    </div>
  );
};

export default Dashboard;
