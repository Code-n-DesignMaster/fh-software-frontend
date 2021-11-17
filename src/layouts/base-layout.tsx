import { useRouter } from 'next/router';
import AccessPopup from '@components/access-popup';
import BlankLayout from './blank-layout';
import MaintenanceLayout from './maintenance-layout';
import GEOLayout from './geoBlocked-layout';
import PublicLayout from './public-layout';
import NewLayout from './new-layout';

type Props = {
  children: any;
  layout?: string;
  maintenance?: boolean;
  geoBlocked?: boolean;
};

const LayoutMap = {
  geoBlock: GEOLayout,
  maintenance: MaintenanceLayout,
  public: PublicLayout,
  blank: BlankLayout
};

const BaseLayout = ({
  children,
  layout,
  maintenance = false,
  geoBlocked = false
}: Props) => {
  const { pathname } = useRouter();

  if (maintenance) {
    return <MaintenanceLayout />;
  }

  if (geoBlocked) {
    return <GEOLayout />;
  }

  const CustomLayout = LayoutMap[layout];
  if (CustomLayout) {
    return <CustomLayout>{children}</CustomLayout>;
  }

  return (
    <NewLayout
      transparent={[
        '/',
        '/contact',
        '/about',
        '/faq',
        '/auth/forgot-password',
        '/auth/fan-register',
        '/auth/model-register'
      ].includes(pathname)}
    >
      <AccessPopup>{children}</AccessPopup>
    </NewLayout>
  );
};

export default BaseLayout;
