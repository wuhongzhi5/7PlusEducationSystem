//#region 上传音频功能
// 引入响应式API
import { reactive, ref } from "vue";
// 引入上传音频接口配置
import questionAPI from "@/api/questionAPI";
// 引入提示框
import { message } from "ant-design-vue";

export function useUploadAudio(addSST) {
  // 上传音频
  const uploadAudio = reactive({
    // 地址
    url: "/api" + questionAPI.uploadAudio,
    // 请求头
    headers: { Token: window.localStorage.getItem("token") }
  });

  // 上传音频
  const uploadAudioList = ref([]);

  // 切换上传音频
  const changeUploadAudio = info => {
    let fileList = [...info.fileList];
    // 限制上传音频数量为 1
    fileList = fileList.slice(-1);
    uploadAudioList.value = fileList;
    if (info.file.status == "done" && info.file.response.success) {
      console.log(info.file);
      // 提示用户
      message.success("音频上传成功");
      // 保存音频路径
      addSST.model.titleAudio = info.file.response.data.fileUrl;
    }
  };

  // 导出
  return {
    uploadAudio,
    uploadAudioList,
    changeUploadAudio
  };
}
//#endregion
