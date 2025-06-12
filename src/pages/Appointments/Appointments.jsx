import { useSelector } from 'react-redux';
import PatientAppointmentView from './PatientAppointmentView';
import DoctorAppointmentView from './DoctorAppointmentView';

const Appointment = () => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className="container mx-auto p-4 min-h-screen">
      {currentUser?.isDoctor ? <DoctorAppointmentView /> : <PatientAppointmentView />}
    </div>
  );
};

export default Appointment;