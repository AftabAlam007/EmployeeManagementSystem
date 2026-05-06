
import PersonalDetailsView from './PersonalDetailsView.jsx';
import ProfessionalDetailsView from './ProfessionalDetailsView.jsx';
import ProjectHistoryView from './ProjectHistoryView.jsx';
import FinanceView from './FinanceView.jsx';


const ViewOnlyDetails = ({ employee }) => {
  console.log("=== ViewOnlyDetails DEBUG ===", employee);

  // Fallback UI to prevent the modal from just appearing blank
  if (!employee || Object.keys(employee).length === 0) {
    return <div className="p-8 text-center text-slate-500 font-medium">No Data Found or Loading...</div>;
  }

  // 🔥 UPDATED: Map the new EmployeeViewDTO structure to component expected format
  const personalData = employee?.personalDetails || (employee?.name ? {
    name: employee.name,
    email: employee.email
  } : {});

  const professionalData = employee?.professionalDetails || (employee?.employmentCode ? {
    employmentCode: employee.employmentCode,
    manager: employee.manager,
    hrName: employee.hrName,
    reportingManagerCode: employee.reportingManagerCode,
    dateOfJoining: employee.dateOfJoining
  } : {});

  const financeData = employee?.finance ? {
    maskedPAN: employee.finance?.maskedPAN,
    maskedAadhar: employee.finance?.maskedAadhar,
    panCard: employee.finance?.maskedPAN || employee.finance?.panCard, // For backward compatibility
    aadharCard: employee.finance?.maskedAadhar || employee.finance?.aadharCard, // For backward compatibility
    ctcBreakup: employee.finance?.ctcBreakup,
    bankDetails: employee.finance?.bankDetails,
    bankName: employee.finance?.bankDetails?.bankName,
    branch: employee.finance?.bankDetails?.branch,
    ifscCode: employee.finance?.bankDetails?.ifscCode,
  } : (employee?.maskedPAN ? {
    panCard: employee.maskedPAN,
    aadharCard: employee.maskedAadhar,
    ctcBreakup: employee.ctcBreakup,
    bankName: employee.bankName,
    branch: employee.branch,
    ifscCode: employee.ifscCode
  } : {});

  const projectsData = employee?.projects?.length ? employee.projects : (employee?.project ? [{ projectName: employee.project }] : []);

  return (
    <div className="p-1">
      <div className="space-y-8">
        <PersonalDetailsView data={personalData} />
        <ProfessionalDetailsView data={professionalData} />
        <ProjectHistoryView data={projectsData} />
        <FinanceView data={financeData} />
      </div>
    </div>
  );
};

export default ViewOnlyDetails;