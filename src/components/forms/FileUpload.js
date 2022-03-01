import databaseService from '../../services/firestore';

export default function FileUpload(props) {
  const { jobId } = props;

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (e === null) return;

    try {
      databaseService.uploadImage(jobId, file);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <label htmlFor="file-upload">
      Upload
      <input
        name="file-upload"
        id="file-upload"
        type="file"
        onChange={handleUpload}
        style={{ opacity: 0, position: 'absolute', left: '-9999px' }}
      />
    </label>
  );
}
