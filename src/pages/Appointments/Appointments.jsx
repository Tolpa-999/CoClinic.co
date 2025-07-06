import { useSelector } from 'react-redux';
import PatientAppointmentView from './PatientAppointmentView';
import DoctorAppointmentView from './DoctorAppointmentView';

const Appointment = () => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className="container mx-auto p-4 min-h-screen   bg-[url('/livechat_3.jpg')] bg-cover bg-center bg-no-repeat">
      {currentUser?.isDoctor ? <DoctorAppointmentView /> : <PatientAppointmentView />}
    </div>
  );
};

export default Appointment;