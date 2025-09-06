//   const [isLoading, setIsLoading] = useState(false);
//   const [sessionId, setSessionId] = useState<string>("");

//   const [selectedFile, setSelectedFile] = useState<File | null>(null);
//   const [isUploading, setIsUploading] = useState(false);

//   const verifySession = async () => {
//     setIsLoading(true);
//     const savedSessionId = localStorage.getItem(SESSION_STORAGE_KEY);

//     console.log({ savedSessionId });

//     if (!savedSessionId) {
//       const id = crypto.randomUUID();
//       setSessionId(id);
//       localStorage.setItem(SESSION_STORAGE_KEY, id);
//       setIsLoading(false);
//       return;
//     }

//     api
//       .post("/api/session/verify")
//       .then((res) => {
//         console.log(res.data);
//       })
//       .catch((err) => {
//         console.error("Error verifying session:", err);
//       })
//       .finally(() => {
//         setIsLoading(false);
//       });
//   };

//   const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (file) {
//       setSelectedFile(file);
//     }
//   };

//   const handleFileUpload = async () => {
//     if (!selectedFile) {
//       return;
//     }

//     // Delete Current Session If Uploading New File

//     setIsUploading(true);

//     const formData = new FormData();
//     formData.append("pdf", selectedFile);

//     api
//       .post("/api/upload", formData)
//       .then((res) => {
//         console.log(res.data);
//       })
//       .catch((err) => {
//         console.error("Error uploading pdf:", err);
//       })
//       .finally(() => {
//         setIsUploading(false);
//       });
//   };

//   useEffect(() => {
//     verifySession();
//   }, []);
