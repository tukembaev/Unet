import { lazy, Suspense } from "react";

import RegisterForm from "../components/Forms/RegisterForm/RegisterForm";
import Developing from "../helpers/Developing";
import { Login, MainPage, TasksPage, StatementPage } from "../pages";
// import ChancelleryInfo from "../pages/ChancelleryPage/ChancelleryInfo/ChancelleryInfo";
import ChatPage from "../pages/ChatPage/ChatPage";
import ChatPageContainer from "../pages/ChatPage/ChatPageContainer";
import QrcodeInfo from "../pages/QrcodePage/QrcodeInfo/QrcodeInfo";
import QrcodePage from "../pages/QrcodePage/QrcodePage";


import StatementInfo from "../pages/StatementPage/components/StatementTable/StatementInfo/StatementInfo";
import SupportInfo from "../pages/SupportPage/components/SupportInfo/SupportInfo";
import SupportPage from "../pages/SupportPage/SupportPage";



// import ChancelleryTable from "../pages/ChancelleryPage/ChancelleryTable";
import OrderInfo from "./../pages/OrderPage/components/OrderTable/OrderInfo/OrderInfo";
import OrderPage from "./../pages/OrderPage/OrderPage";

import TaskTree from "../hooks/TaskTree/TaskTree";
import Order from "../pages/OrderPage/components/OrderTable/OrderInfo/components/Order/Order";
import StatisticPage from "../pages/StatisticPage/StatisticPage";
import StructurePage from "../pages/StructurePage/StructurePage";
import StructureForm from "../components/Forms/StructureForm/StructureForm";
import StructureInfo from "../pages/StructurePage/components/StructureInfo";
import QuizForm from "../components/Forms/QuizForm/QuizForm";

import AccademCalendarPage from "../pages/AccademCalendarPage/AccademCalendarPage";
import AllStatisticPage from "../pages/StatisticPage/AllStatisticPage";
// import CollectivePage from "../pages/СollectivePage/CollectivePage";
import StudyPlanPage from "../pages/StudyPlanPage/StudyPlanPage";
import StudyPlanInfo from "../pages/StudyPlanPage/StudyPlanInfo/StudyPlanInfo";
import FlowPage from "../pages/FlowPage/FlowPage";
import DisciplinePage from "../pages/DisciplinePage/DisciplinePage";
import HomeCard from "../pages/HomeCard/HomeCard";
import RegisterDiscipline from "../pages/DisciplinePage/RegisterDiscipline";

import PersonalCard from "../pages/ProfilePage/PersonalCard/PersonalCard";
import Europass from "../pages/ProfilePage/Europass/Europass";
import FinalEuropass from "../pages/ProfilePage/Europass/FinalEuropass";
import PublicationsPage from "../pages/PublicationsPage/PublicationsPage";
import TaskItemInfo from "../pages/TasksPage/components/TaskItem/TaskItemInfo/TaskItemInfo";
import EuropassEn from "../pages/ProfilePage/Europass/EuropassEn/EuropassEn";
import FinalEuropassEn from "../pages/ProfilePage/Europass/EuropassEn/FinalEuropassEn";
import EuropassKy from "../pages/ProfilePage/Europass/EuropassKy/EuropassKy";
import FinalEuropassKy from "../pages/ProfilePage/Europass/EuropassKy/FinalEuropassKy";
import SchedulePage from "../pages/SchedulePage/SchedulePage";
import FinalKpiPage from "../pages/KpiPage/FinalKpiPage";
import CheckPage from "../pages/CheckPage/CheckPage";
import AlertsKpiPage from "../pages/AlertsKpiPage/AlertsKpiPage";
import ChancelleryInfo from "../pages/ChancelleryPage/ChancelleryInfo/ChancelleryInfo";
import ChancelleryTable from "../pages/ChancelleryPage/ChancelleryTable";
import ChatPage2 from "../pages/ChatPage2/ChatPage2";
import LoadPage from "../pages/LoadPage/LoadPage";
// KPi

import KpiEmployees from "../pages/KpiPage/components/KpiEmployees/KpiEmployees";
import KpiEmployee from "../pages/KpiPage/components/KpiEmployees/components/KpiEmployee";
import KpiCenter from "../pages/KpiPage/components/KpiReport/KpiCenter/KpiCenter";
import KpiInstitute from "../pages/KpiPage/components/KpiReport/KpiInstitute/KpiInstitute";
import DivisionEmployee from "../pages/KpiPage/components/KpiReport/components/DivisionEmployee/DivisionEmployee";
import CenterEmployee from "../pages/KpiPage/components/KpiReport/components/CenterEmployee/CenterEmployee";
import InstitiuteDepartment from "../pages/KpiPage/components/KpiReport/components/InstitiuteDepartment/InstitiuteDepartment";
import InstitiuteEmployee from "../pages/KpiPage/components/KpiReport/components/InstitiuteEmployee/InstitiuteEmployee";
import AllKpiList from "../pages/KpiPage/components/KpiList/components/AllKpiList";
import StickerPage from "../pages/StickerPage/StickerPage";
import AllEmployees from "../pages/KpiPage/components/KpiReport/components/AllEmployees/AllEmployees";
import ListInput from "../pages/ChatPage2/testAss";


// 
import ReportPage from "../pages/ReportPage/ReportPage";
import StudyReportPage from "../pages/ReportPage/components/StudyReportPage/StudyReportPage";

const KpiDivision = lazy(() => import("../pages/KpiPage/components/KpiReport/KpiDivision/KpiDivision"))

export const routes = [
   
    {
        path: '/',
        component: <Login/>
    },
    {
        path: '/alerts/:id',
        component: <MainPage/>,
    },
    {
        path: '/publications/',
        component: <PublicationsPage/>,
    },
    {
        path: '/tasks/:id',
        component: <TasksPage/> ,
    },
    {
        path: `/task/:id`,
        component: <TaskItemInfo isSubTask = {false} />
    },
    {
        path: `/subtask/:id`,
        component: <TaskItemInfo isSubTask = {true} />
    },
    {
        path: '/statements/:id',
        component: <StatementPage/>
    },

    {
        path: `/statement/:id`,
        component: <StatementInfo/>
    },
    {
        path: '/orders/:id',
        component: <OrderPage/>
    },
    {
        path: `/order/:id`,
        component: <OrderInfo/>
    },
 
    {
        path: '/qr-code',
        component: <QrcodePage/>
    },
    {
        path: '/qrcode/:id',
        component: <QrcodeInfo/>
    }
    ,
    {
        path: '/chats',
        component: <ChatPageContainer/>
    },
    {
        path: '/chats/:id',
        component: <ChatPageContainer/>
    },
    
    {
        path: '/support',
        component: <SupportPage/>
    }
    ,
    {
        path: '/support/:id',
        component: <SupportInfo/>
    }
    ,
    
    {
        path: '/register_person',
        component: <RegisterForm/>
    }
    ,
 
    {
        path: '/chancellerys/',
        component: <ChancelleryTable/>
    }
    ,
{
        path: '/chancellery/:id',
        component: <ChancelleryInfo/>
    }
    ,
    {
        path: '/statistic/',
        component: <StatisticPage/>
    }
    ,
    {
        path: '/all-statistic/',
        component: <AllStatisticPage/>
    }
    ,
    {
        path: '/task-tree/:id',
        component: <TaskTree/>
    } 
    ,
    {
        path: '/test/',
        component: <ListInput/>
    } 
    ,
    {
        path: '/structure/',
        component: <StructurePage/>
    }
    ,
    {
        path: '/structure-sheme/:id',
        component: <StructureInfo/>
    }
    ,
    {
        path: '/add-structure/',
        component: <StructureForm/>
    }
    ,
    {
        path: '/answer-quiz/',
        component: <QuizForm/>
    }  
    ,


    {
        path: '/academ-calendar/',
        component: <AccademCalendarPage/>
    }
  
    ,
    {
        path: '/study-plan/',
        component: <StudyPlanPage />
    }
    ,
    {
        path: '/study-plan/:id',
        component: <StudyPlanInfo />
    }
    ,
    {
        path: '/flow/',
        component: <FlowPage />
    }
 
    ,
    {
        path: '/discipline/',
        component: <DisciplinePage />
    }

    ,
    {
        path: '/student-discipline/',
        component: <RegisterDiscipline />
    }
    ,
    {
        path: '/schedules/',
        component: <SchedulePage />
    }

    
    ,


    {
        path: '/visit/',
        component: <HomeCard />
    }
    
    ,

    {
        path: '/personalcard/',
        component: <PersonalCard />
    }
    ,

    {
        path: '/europass/',
        component: <Europass />
    }
    ,

    {
        path: '/finaleuro/',
        component: <FinalEuropass />
    }
    ,
    {
        path: '/europassen/',
        component: <EuropassEn />
    },
    {
        path: '/finaleuropassen/',
        component: <FinalEuropassEn />
    },
    
    {
        path: '/europassky/',
        component: <EuropassKy />
    },
    {
        path: '/finaleuropassky/',
        component: <FinalEuropassKy />
    },
    
    {
        path: '/kpi/',
        component: <FinalKpiPage />
    },
    {
        path: '/kpi-employee/:id',
        component: <KpiEmployee />
    },
    {
        path: '/kpi-center/',
        component: <KpiCenter />
    },
    {
        path: '/center-employee/:id',
        component: <CenterEmployee />
    },
    {
        path: '/kpi-division/',
        component: <Suspense fallback={<p>Loading...</p>}>
        <KpiDivision />
       </Suspense>
    },
    {
        path: '/division-employee/:id',
        component: <DivisionEmployee />
    },
    
    {
        path: '/all-employee/',
        component: <AllEmployees />
    },
    
    {
        path: '/kpi-institute/',
        component: <KpiInstitute />
    },
    {
        path: '/institute-department/:id',
        component: <InstitiuteDepartment />
    },
    {
        path: '/institute-employee/:id',
        component: <InstitiuteEmployee />
    },
    {
        path: '/scanqr/',
        component: <CheckPage />
    },
    {
        path: '/kpi-info/:id',
        component: <AlertsKpiPage />
    },
    {
        path: '/kpi-more/',
        component: <AllKpiList />
    },
    ,
    
    {
        path: '/load/',
        component: <LoadPage />
    },
    {
        path: '/sticker/',
        component: <StickerPage />
    },
 
    {
        path: '/reports/',
        component: <ReportPage />
    },
    {
        path: '/reports/syllabus/',
        component: <StudyReportPage />
    },
]