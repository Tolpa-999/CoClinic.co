import { Sidebar, SidebarItem, SidebarItemGroup } from 'flowbite-react';
import axios from 'axios';
import {
  HiUser,
  HiArrowSmRight,
  HiDocumentText,
  HiOutlineUserGroup,
  HiOutlinePaperClip,
  HiAnnotation,
  HiChartPie,
} from 'react-icons/hi';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AuthUrls } from '../../utils/serverURL';
import {
  signOutUserSuccess,
  signOutUserFailure,
  signOutUserStart,
} from '../../features/user/userSlice';
import { useTranslation } from 'react-i18next';
import axiosInstance from '../../utils/axiosInstance';

// Define sidebar items based on user role


export default function DashSidebar() {

  const {t} = useTranslation()

  
  const adminItems = [
  { to: '/dashboard?tab=dash', icon: HiChartPie, label: t('dashboard.title') },
  { to: '/dashboard?tab=post', icon: HiOutlinePaperClip, label: t('dashboard.post.name') },
  { to: '/dashboard?tab=posts', icon: HiDocumentText, label: t('dashboard.posts.name') },
  { to: '/dashboard?tab=users', icon: HiOutlineUserGroup, label: t('dashboard.users.name') },
  { to: '/dashboard?tab=comments', icon: HiAnnotation, label: t('dashboard.comments.name') },
];

const userItems = [
  { to: '/dashboard?tab=profile', icon: HiUser, label: t('dashboard.profile.name') },
];

  const location = useLocation();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const [tab, setTab] = useState('');

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const { data } = await axiosInstance.get(AuthUrls.signOut);
      if (data.status !== 'success') {
        dispatch(signOutUserFailure(data));
        return;
      }
      dispatch(signOutUserSuccess(data));
    } catch (error) {
      dispatch(signOutUserFailure(error.message));
    }
  };

  // Combine items based on user role
  const sidebarItems = currentUser?.isAdmin ? [...adminItems, ...userItems] : userItems;

  return (
    <Sidebar className="w-full md:w-56">
      <SidebarItemGroup className="flex flex-col gap-1">
        {sidebarItems.map((item, index) => (
          <SidebarItem
            key={index}
            as={Link}
            to={item.to}
            active={tab === item.to.split('=')[1]}
            icon={item.icon}
            label={item.label === 'Profile' || 'الملف الشخصي' ? (currentUser.isAdmin ? t('dashboard.profile.admin') : t('dashboard.profile.user')) : undefined}
            labelColor="gray"
          >
            {item.label}
          </SidebarItem>
        ))}
        <SidebarItem icon={HiArrowSmRight} onClick={handleSignOut}>
          {t('dashboard.signout')}
        </SidebarItem>
      </SidebarItemGroup>
    </Sidebar>
  );
}