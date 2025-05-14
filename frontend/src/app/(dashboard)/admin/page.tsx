import {
  DashboardHeader,
  DashboardHeaderDescription,
  DashboardHeaderTitle,
  DashboardMain,
} from '@/components/dashboard/dashboard-items'
import { IoHomeSharp } from "react-icons/io5";

export default function Page() {
  return (
    <>
      <DashboardHeader>
        <DashboardHeaderTitle>
          <IoHomeSharp/>
          Home
        </DashboardHeaderTitle>
        <DashboardHeaderDescription>
          Tela principal da aplicação.
        </DashboardHeaderDescription>
      </DashboardHeader>
      <DashboardMain></DashboardMain>
    </>
  )
}
