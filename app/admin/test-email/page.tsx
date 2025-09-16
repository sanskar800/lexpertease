"use client";
import { useState } from "react";
import { Mail, Send, CheckCircle, XCircle } from "lucide-react";
import Navbar from "../../../Components/Navbar";
import Footer from "../../../Components/Footer";
import { trpc } from "../../../lib/trpc";

export default function AdminTestPage() {
  const [email, setEmail] = useState("");
  const [testResult, setTestResult] = useState<{ type: 'success' | 'error', message: string } | null>(null);

  const testEmailMutation = trpc.auth.testEmail.useMutation({
    onSuccess: (data) => {
      setTestResult({ type: 'success', message: data.message });
    },
    onError: (error) => {
      setTestResult({ type: 'error', message: error.message });
    },
  });

  const forgotPasswordMutation = trpc.auth.forgotPassword.useMutation({
    onSuccess: (data) => {
      setTestResult({ type: 'success', message: data.message });
    },
    onError: (error) => {
      setTestResult({ type: 'error', message: error.message });
    },
  });

  const handleTestEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setTestResult(null);
    testEmailMutation.mutate({ email });
  };

  const handleTestForgotPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setTestResult(null);
    forgotPasswordMutation.mutate({ email });
  };

  if (process.env.NODE_ENV !== 'development') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
          <p className="text-gray-600">This page is only available in development mode.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      <div className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Email Testing</h2>
            <p className="text-gray-600">Test email functionality (Development Only)</p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md space-y-6">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h3 className="text-sm font-medium text-yellow-800 mb-2">Setup Instructions:</h3>
              <ol className="text-xs text-yellow-700 space-y-1">
                <li>1. Update .env file with your SMTP settings</li>
                <li>2. For Gmail: Enable 2FA and use App Password</li>
                <li>3. Set SMTP_USER and SMTP_PASS in .env</li>
                <li>4. Restart the development server</li>
              </ol>
            </div>

            <form onSubmit={handleTestEmail} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Test Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0F8BDB] focus:border-transparent text-gray-900 placeholder-gray-500"
                    placeholder="Enter email address"
                    required
                  />
                </div>
              </div>

              <div className="space-y-3">
                <button
                  type="submit"
                  disabled={testEmailMutation.isPending}
                  className="w-full bg-[#0F8BDB] text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-[#0F8BDB] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {testEmailMutation.isPending ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Sending Test Email...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Send Test Email
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleTestForgotPassword}
                  disabled={forgotPasswordMutation.isPending}
                  className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-called flex items-center justify-center"
                >
                  {forgotPasswordMutation.isPending ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Sending Reset Email...
                    </>
                  ) : (
                    <>
                      <Mail className="w-4 h-4 mr-2" />
                      Test Password Reset Email
                    </>
                  )}
                </button>
              </div>
            </form>

            {testResult && (
              <div className={`p-4 rounded-lg flex items-center ${
                testResult.type === 'success' 
                  ? 'bg-green-50 border border-green-200' 
                  : 'bg-red-50 border border-red-200'
              }`}>
                {testResult.type === 'success' ? (
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-600 mr-2" />
                )}
                <span className={testResult.type === 'success' ? 'text-green-700' : 'text-red-700'}>
                  {testResult.message}
                </span>
              </div>
            )}

            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="text-sm font-medium text-gray-900 mb-2">Environment Variables Needed:</h4>
              <pre className="text-xs text-gray-600 whitespace-pre-wrap">
{`SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM_NAME=LexpertEase
SMTP_FROM_EMAIL=your-email@gmail.com`}
              </pre>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}