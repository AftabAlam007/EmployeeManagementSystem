// src/components/dashboard/EmployeeForm.jsx
import React, { useState, useEffect } from 'react';
import { createEmployee, updateEmployee } from '../../services/employeeService';
import { toast } from 'react-toastify';

// --- Helper Components (FormInput, AddressFields) ---
const FormInput = ({ label, id, ...props }) => {
    const inputId = id || props.name;
    return (
        <div className="col-span-12 sm:col-span-6 md:col-span-4">
            <label htmlFor={inputId} className="block text-sm font-medium text-slate-700">{label}</label>
            <input id={inputId} {...props} className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 disabled:bg-slate-100" />
        </div>
    );
};

const AddressFields = ({ legend, data, onChange, namePrefix }) => (
    <fieldset className="col-span-12 md:col-span-6 grid grid-cols-12 gap-4 border p-4 rounded-md">
        <legend className="text-sm font-medium text-slate-800 px-1">{legend}</legend>
        <FormInput label="Address Line 1" name={`${namePrefix}.addressLine1`} value={data?.addressLine1 || ''} onChange={onChange} required />
        <FormInput label="Address Line 2" name={`${namePrefix}.addressLine2`} value={data?.addressLine2 || ''} onChange={onChange} />
        <FormInput label="City" name={`${namePrefix}.city`} value={data?.city || ''} onChange={onChange} required />
        <FormInput label="Pin Code" name={`${namePrefix}.pinCode`} value={data?.pinCode || ''} onChange={onChange} pattern="\d{6}" placeholder="Enter 6 digit pin code" title="6 digits" required />
    </fieldset>
);
// --- End Helper Components ---

const BLANK_FORM_STATE = {
    user: { email: '', password: '', role: 'ROLE_EMPLOYEE' },
    managerName: 'Manager Name',
    currentProjectName: '',
    personalDetails: {
        fullName: 'John Doe', dateOfBirth: '1990-01-01', gender: 'Male', age: 30, mobile: '1234567890', personalEmail: 'john.doe@example.com',
        emergencyContactName: 'Jane Doe', emergencyContactMobile: '0987654321',
        currentAddress: { city: 'New York', addressLine1: '123 Main Street', addressLine2: 'Apt 101', pinCode: '100001' },
        permanentAddress: { city: 'Los Angeles', addressLine1: '456 Park Avenue', addressLine2: 'Apt 202', pinCode: '900012' },
    },
    professionalDetails: {
        employmentCode: '123456',
        companyEmail: 'john.doe@company.com', officePhone: '12345678', city: 'New York', dateOfJoining: '2020-01-01',
        reportingManagerEmployeeCode: 'MGR001', hrName: 'HR Manager',
        officeAddress: { city: 'New York', addressLine1: '789 Office Blvd', addressLine2: 'Suite 500', pinCode: '100012' },
        employmentHistory: [],
    },
    projects: [],
    finance: {
        panCard: '', aadharCard: '', ctcBreakup: '',
        bankDetails: { bankName: '', branch: '', ifscCode: '' },
    },
};

const DEV_PREFILLED_STATE = {
    user: { email: '', password: '', role: 'ROLE_EMPLOYEE' },
    managerName: 'Robert Downy',
    currentProjectName: 'Project Iron',
    personalDetails: {
        fullName: 'Tony Stark',
        dateOfBirth: '1985-04-20',
        gender: 'Male',
        age: 39,
        mobile: '1234567890',
        personalEmail: 'tony.stark@personal.com',
        emergencyContactName: 'Pepper Potts',
        emergencyContactMobile: '0987654321',
        currentAddress: {
            addressLine1: '10880 Malibu Point',
            addressLine2: '',
            city: 'Malibu',
            pinCode: '902650',
        },
        permanentAddress: {
            addressLine1: '123 Residential Street',
            addressLine2: 'Apt 4B',
            city: 'Newark',
            pinCode: '100012',
        },
    },
    professionalDetails: {
        employmentCode: '',
        companyEmail: 'tony.stark@starkindustries.com',
        officePhone: '1231231234',
        city: 'New York',
        dateOfJoining: '2010-01-01',
        reportingManagerEmployeeCode: 'NICKFURY01',
        hrName: 'Happy Hogan',
        officeAddress: {
            addressLine1: 'Stark Tower',
            addressLine2: '5th Avenue',
            pinCode: '100015',
            city: 'New York'
        },
        employmentHistory: [],
    },
    projects: [
        {
            projectCode: 'P007',
            startDate: '2022-01-01',
            endDate: '2022-12-31',
            clientOrProjectName: 'US Government',
            reportingManagerEmployeeCode: 'NICKFURY01'
        }
    ],
    finance: {
        panCard: 'STARK1234P',
        aadharCard: '987654321098',
        ctcBreakup: 'All of it',
        bankDetails: {
            bankName: 'Bank of America',
            branch: 'New York',
            ifscCode: 'BOFA0N12345',
        },
    },
};

const initialState = import.meta.env.DEV ? DEV_PREFILLED_STATE : BLANK_FORM_STATE;

const EmployeeForm = ({ employee, employeeToEdit, onSuccess, onSave, onClose, onCancel }) => {
    // Support both prop naming conventions
    const employeeData = employee || employeeToEdit || null;
    const handleSuccess = onSuccess || onSave || (() => {});
    const handleClose = onClose || onCancel || (() => {});

    const [formData, setFormData] = useState(() =>
        JSON.parse(JSON.stringify(initialState))
    );
    const [error, setError] = useState('');
    const isEditMode = !!employeeData;

    useEffect(() => {
        if (isEditMode) {
            const sanitizedEmployee = JSON.parse(JSON.stringify(employeeData));

            // ✅ FIX: initialState spread first, employee data second
            // so real employee values always win over defaults
            setFormData({
                ...initialState,
                ...sanitizedEmployee,
                user: {
                    ...initialState.user,
                    ...(sanitizedEmployee.user || {}),
                },
                personalDetails: {
                    ...initialState.personalDetails,
                    ...(sanitizedEmployee.personalDetails || {}),
                    currentAddress: {
                        ...initialState.personalDetails.currentAddress,
                        ...(sanitizedEmployee.personalDetails?.currentAddress || {}),
                    },
                    permanentAddress: {
                        ...initialState.personalDetails.permanentAddress,
                        ...(sanitizedEmployee.personalDetails?.permanentAddress || {}),
                    },
                },
                professionalDetails: {
                    ...initialState.professionalDetails,
                    ...(sanitizedEmployee.professionalDetails || {}),
                    officeAddress: {
                        ...initialState.professionalDetails.officeAddress,
                        ...(sanitizedEmployee.professionalDetails?.officeAddress || {}),
                    },
                },
                // ✅ FIX: employee finance data comes LAST so it overrides defaults
                finance: {
                    ...initialState.finance,
                    ...(sanitizedEmployee.finance || {}),
                    bankDetails: {
                        ...initialState.finance.bankDetails,
                        ...(sanitizedEmployee.finance?.bankDetails || {}),
                    },
                },
            });
        } else {
            setFormData(JSON.parse(JSON.stringify(initialState)));
        }
    }, [employeeData, isEditMode]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        const nameParts = name.split('.');

        setFormData(prev => {
            const newFormData = JSON.parse(JSON.stringify(prev));
            let current = newFormData;
            for (let i = 0; i < nameParts.length - 1; i++) {
                const key = nameParts[i];
                const nextKey = nameParts[i + 1];
                const nextIsIndex = !isNaN(nextKey); // e.g. "0", "1"

                if (nextIsIndex) {
                    // current key should be an array
                    if (!Array.isArray(current[key])) current[key] = [];
                    const idx = parseInt(nextKey, 10);
                    if (!current[key][idx]) current[key][idx] = {};
                    current = current[key];
                } else if (!isNaN(key)) {
                    // current key IS the index, already navigated above
                    const idx = parseInt(key, 10);
                    if (!current[idx]) current[idx] = {};
                    current = current[idx];
                } else {
                    if (!current[key] || typeof current[key] !== 'object') {
                        current[key] = {};
                    }
                    current = current[key];
                }
            }
            const lastKey = nameParts[nameParts.length - 1];
            if (!isNaN(lastKey)) {
                // shouldn't happen but guard anyway
                current[parseInt(lastKey, 10)] = value;
            } else {
                current[lastKey] = value;
            }
            return newFormData;
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            console.log('=== FINAL PAYLOAD:', formData);
            console.log('=== REQUEST PAYLOAD ===');
            console.log(JSON.stringify(formData, null, 2));

            const validationErrors = validatePayload(formData);
            if (validationErrors.length > 0) {
                console.error('=== CLIENT-SIDE VALIDATION ERRORS ===', validationErrors);
                setError('Please fix the following: ' + validationErrors.join('; '));
                return;
            }

            if (isEditMode) {
                await updateEmployee(employeeData.id, formData);
                toast.success('Employee updated successfully!');
            } else {
                await createEmployee(formData);
                toast.success('Employee created successfully!');
            }
            handleSuccess();
        } catch (err) {
            console.error('=== BACKEND ERROR ===', err.response?.data);
            console.error('=== BACKEND VALIDATION ERRORS ===', err.response?.data?.data);

            const errorData = err.response?.data;
            const errorMsg = errorData?.message || `Failed to ${isEditMode ? 'update' : 'create'} employee.`;

            if (errorData?.data && Object.keys(errorData.data).length > 0) {
                const fieldErrors = Object.entries(errorData.data)
                    .map(([field, msg]) => `${field}: ${msg}`)
                    .join('; ');
                setError(`${errorMsg} - ${fieldErrors}`);
            } else {
                setError(errorMsg);
            }
        }
    };

    const validatePayload = (data) => {
        const errors = [];
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (!data.user?.email?.trim()) errors.push('User email is required');
        if (!data.user?.password) errors.push('Password is required');
        if (data.user?.password && data.user.password.length < 6) errors.push('Password must be at least 6 characters');
        if (!data.user?.role) errors.push('User role is required');

        if (!data.managerName?.trim()) errors.push('Manager name is required');

        if (!data.personalDetails?.fullName?.trim()) errors.push('Full name is required');
        if (!data.personalDetails?.dateOfBirth) errors.push('Date of birth is required');
        else {
            const dob = new Date(data.personalDetails.dateOfBirth);
            if (dob >= today) errors.push('Date of birth must be in the past');
        }
        if (!data.personalDetails?.gender) errors.push('Gender is required');
        if (!data.personalDetails?.mobile) errors.push('Mobile is required');
        else if (!/^\d{10}$/.test(data.personalDetails.mobile)) errors.push('Mobile must be 10 digits');
        if (!data.personalDetails?.personalEmail?.trim()) errors.push('Personal email is required');
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.personalDetails.personalEmail)) errors.push('Invalid personal email format');
        if (!data.personalDetails?.emergencyContactName?.trim()) errors.push('Emergency contact name is required');
        if (!data.personalDetails?.emergencyContactMobile) errors.push('Emergency contact mobile is required');
        else if (!/^\d{10}$/.test(data.personalDetails.emergencyContactMobile)) errors.push('Emergency contact mobile must be 10 digits');

        if (!data.personalDetails?.currentAddress?.addressLine1?.trim()) errors.push('Current address line 1 is required');
        if (!data.personalDetails?.currentAddress?.city?.trim()) errors.push('Current city is required');
        if (!data.personalDetails?.currentAddress?.pinCode) errors.push('Current pin code is required');
        else if (!/^\d{6}$/.test(data.personalDetails.currentAddress.pinCode)) errors.push('Current pin code must be 6 digits');

        if (!data.personalDetails?.permanentAddress?.addressLine1?.trim()) errors.push('Permanent address line 1 is required');
        if (!data.personalDetails?.permanentAddress?.city?.trim()) errors.push('Permanent city is required');
        if (!data.personalDetails?.permanentAddress?.pinCode) errors.push('Permanent pin code is required');
        else if (!/^\d{6}$/.test(data.personalDetails.permanentAddress.pinCode)) errors.push('Permanent pin code must be 6 digits');

        if (!data.professionalDetails?.employmentCode?.trim()) errors.push('Employment code is required');
        else if (!/^\d{6}$/.test(data.professionalDetails.employmentCode)) errors.push('Employment code must be 6 digits');
        if (!data.professionalDetails?.companyEmail?.trim()) errors.push('Company email is required');
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.professionalDetails.companyEmail)) errors.push('Invalid company email format');
        if (!data.professionalDetails?.officePhone?.trim()) errors.push('Office phone is required');
        else if (!/^\d{8,12}$/.test(data.professionalDetails.officePhone)) errors.push('Office phone must be 8-12 digits');
        if (!data.professionalDetails?.reportingManagerEmployeeCode?.trim()) errors.push('Reporting manager code is required');
        if (!data.professionalDetails?.hrName?.trim()) errors.push('HR name is required');
        if (!data.professionalDetails?.dateOfJoining) errors.push('Date of joining is required');
        else {
            const doj = new Date(data.professionalDetails.dateOfJoining);
            if (doj > today) errors.push('Date of joining cannot be in the future');
        }

        if (!data.professionalDetails?.officeAddress?.addressLine1?.trim()) errors.push('Office address line 1 is required');
        if (!data.professionalDetails?.officeAddress?.city?.trim()) errors.push('Office city is required');
        if (!data.professionalDetails?.officeAddress?.pinCode) errors.push('Office pin code is required');
        else if (!/^\d{6}$/.test(data.professionalDetails.officeAddress.pinCode)) errors.push('Office pin code must be 6 digits');

        if (!data.finance?.panCard?.trim()) errors.push('PAN card is required');
        else if (!/^[A-Z]{5}\d{4}[A-Z]$/.test(data.finance.panCard)) errors.push('Invalid PAN card format');
        if (!data.finance?.aadharCard?.trim()) errors.push('Aadhar card is required');
        else if (!/^\d{12}$/.test(data.finance.aadharCard)) errors.push('Aadhar card must be 12 digits');
        if (!data.finance?.ctcBreakup?.trim()) errors.push('CTC breakup is required');
        if (!data.finance?.bankDetails?.bankName?.trim()) errors.push('Bank name is required');
        if (!data.finance?.bankDetails?.branch?.trim()) errors.push('Bank branch is required');
        if (!data.finance?.bankDetails?.ifscCode?.trim()) errors.push('IFSC code is required');
        else if (!/^[A-Z]{4}[0-9][A-Z0-9]{6}$/i.test(data.finance.bankDetails.ifscCode)) errors.push('Invalid IFSC code format (must be 11 characters: 4 letters + 1 digit + 6 alphanumeric)');

        if (data.projects && data.projects.length > 0) {
            data.projects.forEach((proj, idx) => {
                if (!proj.projectCode?.trim()) errors.push(`Project ${idx + 1}: code is required`);
                if (!proj.clientOrProjectName?.trim()) errors.push(`Project ${idx + 1}: client/project name is required`);
                if (!proj.startDate) errors.push(`Project ${idx + 1}: start date is required`);
                if (!proj.endDate) errors.push(`Project ${idx + 1}: end date is required`);
                if (proj.startDate && proj.endDate) {
                    const start = new Date(proj.startDate);
                    const end = new Date(proj.endDate);
                    if (end < start) errors.push(`Project ${idx + 1}: end date must be after start date`);
                    if (end > today) errors.push(`Project ${idx + 1}: end date cannot be in the future`);
                }
            });
        }

        return errors;
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8 max-h-[80vh] overflow-y-auto p-2">
            <h2 className="text-2xl font-bold text-slate-800">{isEditMode ? 'Edit Employee' : 'Create New Employee'}</h2>

            <fieldset className="grid grid-cols-12 gap-6">
                <legend className="col-span-12 text-lg font-semibold text-purple-600 border-b pb-2 mb-2">Core Details</legend>
                <FormInput label="Manager Name" name="managerName" value={formData.managerName || ''} onChange={handleChange} required />
                <FormInput label="Current Project" name="currentProjectName" value={formData.currentProjectName || ''} onChange={handleChange} />
            </fieldset>

            {!isEditMode && (
                <fieldset className="grid grid-cols-12 gap-6">
                    <legend className="col-span-12 text-lg font-semibold text-purple-600 border-b pb-2 mb-2">User Account</legend>
                    <FormInput label="User Email" name="user.email" type="email" value={formData.user?.email || ''} onChange={handleChange} required />
                    <FormInput label="Password" name="user.password" type="password" value={formData.user?.password || ''} onChange={handleChange} required />
                </fieldset>
            )}

            <fieldset className="grid grid-cols-12 gap-6">
                <legend className="col-span-12 text-lg font-semibold text-purple-600 border-b pb-2 mb-2">Personal Details</legend>
                <FormInput label="Full Name" name="personalDetails.fullName" value={formData.personalDetails?.fullName || ''} onChange={handleChange} required />
                <FormInput label="Date of Birth" name="personalDetails.dateOfBirth" type="date" value={formData.personalDetails?.dateOfBirth || ''} onChange={handleChange} disabled={isEditMode} required />
                <div className="col-span-12 sm:col-span-6 md:col-span-4">
                    <label htmlFor="gender" className="block text-sm font-medium text-slate-700">Gender</label>
                    <select id="gender" name="personalDetails.gender" value={formData.personalDetails?.gender || ''} onChange={handleChange} disabled={isEditMode} required className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 disabled:bg-slate-100">
                        <option value="">Select...</option><option value="Male">Male</option><option value="Female">Female</option><option value="Other">Other</option>
                    </select>
                </div>
                <FormInput label="Age" name="personalDetails.age" type="number" value={formData.personalDetails?.age || ''} onChange={handleChange} required />
                <FormInput label="Mobile" name="personalDetails.mobile" value={formData.personalDetails?.mobile || ''} onChange={handleChange} required pattern="\d{10}" title="10 digits" />
                <FormInput label="Personal Email" name="personalDetails.personalEmail" type="email" value={formData.personalDetails?.personalEmail || ''} onChange={handleChange} required />
                <FormInput label="Emergency Contact Name" name="personalDetails.emergencyContactName" value={formData.personalDetails?.emergencyContactName || ''} onChange={handleChange} required />
                <FormInput label="Emergency Contact Mobile" name="personalDetails.emergencyContactMobile" value={formData.personalDetails?.emergencyContactMobile || ''} onChange={handleChange} required pattern="\d{10}" title="10 digits" />
                <AddressFields legend="Current Address" namePrefix="personalDetails.currentAddress" data={formData.personalDetails?.currentAddress} onChange={handleChange} />
                <AddressFields legend="Permanent Address" namePrefix="personalDetails.permanentAddress" data={formData.personalDetails?.permanentAddress} onChange={handleChange} />
            </fieldset>

            <fieldset className="grid grid-cols-12 gap-6">
                <legend className="col-span-12 text-lg font-semibold text-purple-600 border-b pb-2 mb-2">Professional Details</legend>
                <FormInput label="Employment Code" name="professionalDetails.employmentCode" value={formData.professionalDetails?.employmentCode || ''} onChange={handleChange} disabled={isEditMode} required pattern="\d{6}" title="Must be 6 digits" />
                <FormInput label="Company Email" name="professionalDetails.companyEmail" type="email" value={formData.professionalDetails?.companyEmail || ''} onChange={handleChange} disabled={isEditMode} required />
                <FormInput label="Date of Joining" name="professionalDetails.dateOfJoining" type="date" value={formData.professionalDetails?.dateOfJoining || ''} onChange={handleChange} disabled={isEditMode} required />
                <FormInput label="Office Phone" name="professionalDetails.officePhone" value={formData.professionalDetails?.officePhone || ''} onChange={handleChange} required pattern="\d{8,12}" title="8 to 12 digits" />
                <FormInput label="Reporting Manager Code" name="professionalDetails.reportingManagerEmployeeCode" value={formData.professionalDetails?.reportingManagerEmployeeCode || ''} onChange={handleChange} required />
                <FormInput label="HR Name" name="professionalDetails.hrName" value={formData.professionalDetails?.hrName || ''} onChange={handleChange} required />
                <AddressFields legend="Office Address" namePrefix="professionalDetails.officeAddress" data={formData.professionalDetails?.officeAddress} onChange={handleChange} />
            </fieldset>

            <fieldset className="grid grid-cols-12 gap-6">
                <legend className="col-span-12 text-lg font-semibold text-purple-600 border-b pb-2 mb-2">Project Details</legend>
                <FormInput label="Project Code" name="projects.0.projectCode" value={formData.projects?.[0]?.projectCode || ''} onChange={handleChange} />
                <FormInput label="Client/Project Name" name="projects.0.clientOrProjectName" value={formData.projects?.[0]?.clientOrProjectName || ''} onChange={handleChange} />
                <FormInput label="Start Date" name="projects.0.startDate" type="date" value={formData.projects?.[0]?.startDate || ''} onChange={handleChange} />
                <FormInput label="End Date" name="projects.0.endDate" type="date" value={formData.projects?.[0]?.endDate || ''} onChange={handleChange} />
                <FormInput label="Reporting Manager Code" name="projects.0.reportingManagerEmployeeCode" value={formData.projects?.[0]?.reportingManagerEmployeeCode || ''} onChange={handleChange} />
            </fieldset>

            <fieldset className="grid grid-cols-12 gap-6">
                <legend className="col-span-12 text-lg font-semibold text-purple-600 border-b pb-2 mb-2">Finance Details</legend>
                <FormInput label="PAN Card" name="finance.panCard" value={formData.finance?.panCard || ''} onChange={handleChange} required />
                <FormInput label="Aadhar Card" name="finance.aadharCard" value={formData.finance?.aadharCard || ''} onChange={handleChange} required />
                <FormInput label="CTC Breakup" name="finance.ctcBreakup" value={formData.finance?.ctcBreakup || ''} onChange={handleChange} required />
                <FormInput label="Bank Name" name="finance.bankDetails.bankName" value={formData.finance?.bankDetails?.bankName || ''} onChange={handleChange} required />
                <FormInput label="Branch" name="finance.bankDetails.branch" value={formData.finance?.bankDetails?.branch || ''} onChange={handleChange} required />
                <FormInput label="IFSC Code" name="finance.bankDetails.ifscCode" value={formData.finance?.bankDetails?.ifscCode || ''} onChange={handleChange} required />
            </fieldset>

            {error && <p className="text-red-500 text-sm text-center">{error}</p>}

            <div className="flex justify-end gap-4 pt-6 border-t sticky bottom-0 bg-white py-4">
                <button type="button" onClick={handleClose} className="bg-white text-slate-700 px-6 py-2 rounded-lg font-semibold hover:bg-slate-100 border border-slate-300">
                    Cancel
                </button>
                <button type="submit" className="bg-purple-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-purple-700">
                    {isEditMode ? 'Save Changes' : 'Create Employee'}
                </button>
            </div>
        </form>
    );
};

export default EmployeeForm;