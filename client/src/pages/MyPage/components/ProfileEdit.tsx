import React, { useRef, useState, useCallback, useEffect } from 'react';
import {
  UploadBtn,
  ProfileEditWrapper,
  ProfilerEdit,
  ProfileImg,
  ProfileSection,
  TextWrapper,
  NameWrapper,
  InputWrapper,
  TownBtn,
  InputBox,
  StyledForm,
  MyPageEdit,
} from '../style';
import axios from 'axios';
import profileImage from '../../../../src/asset/my_page/profile-image.svg';

const API_HOST = 'https://playpack.shop';

function ProfileEdit() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [nickname, setNickname] = useState<string>('');

  useEffect(() => {
    //회원 정보 조회 Read
    getUserInfo();
  });

  const getUserInfo = useCallback(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/user`)
      .then((response) => {
        const userInfo = response.data;
        setNickname(userInfo.nickname);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const onUploadImage = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files) {
        return;
      }
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append('file', file);
      // formData.append('file', e.target.files[0]);

      // 서버 연결 시
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/images/:username/thumbnail`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          },
        );
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    },
    [],
  );

  const onInputButtonClick = useCallback(() => {
    if (!inputRef.current) {
      return;
    }
    inputRef.current.click();
  }, []);

  const onSubmitForm = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      console.log('Form data:', Object.fromEntries(formData));
      console.log('Form submitted!');
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/user/update`,
          {
            profileImage: previewImage,
            nickname: nickname,
          },
        );
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    },
    [previewImage, nickname],
  );

  // 회원정보 업데이트
  //     const nickname = formData.get('nickname') as string;
  //     axios({
  //       baseURL: API_HOST,
  //       url: '/user/update',
  //       method: 'POST',
  //       data: {
  //         profileImage: previewImage,
  //         nickname: nickname,
  //         // 추가 정보들...
  //       },
  //     })
  //       .then((response) => {
  //         console.log(response.data);
  //       })
  //       .catch((error) => {
  //         console.error(error);
  //       });
  //   },
  //   [previewImage],
  // );

  const onDeleteUser = useCallback(() => {
    //회원정보 삭제
    axios
      .delete(`${process.env.REACT_APP_API_URL}/user`)
      .then((resopnse) => {
        console.log('User deleted successfully');
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  return (
    <MyPageEdit>
      <ProfileEditWrapper>
        <ProfileSection>
          <ProfileImg>
            {previewImage ? (
              <img src={previewImage} alt="Profile Image" />
            ) : (
              <img src={profileImage} alt="Profile Image" />
            )}
          </ProfileImg>
          <ProfilerEdit>
            <input
              ref={inputRef}
              type="file"
              id="imgUpload"
              name="file"
              accept="image/*"
              onChange={onUploadImage}
            />
            <input
              type="text"
              placeholder="닉네임"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
          </ProfilerEdit>
          <UploadBtn onClick={onInputButtonClick}>파일 선택</UploadBtn>
        </ProfileSection>
        <TextWrapper>
          <NameWrapper>
            <ol>
              <li>닉네임</li>
              <li>내 동네</li>
            </ol>
          </NameWrapper>
          <InputWrapper>
            <InputBox>
              <input type="text" placeholder="닉네임" />
            </InputBox>
            <TownBtn>내 동네 설정</TownBtn>
          </InputWrapper>
        </TextWrapper>
      </ProfileEditWrapper>
      <StyledForm onSubmit={onSubmitForm}>
        <input
          type="button"
          value="돌아가기"
          style={{ backgroundColor: '#CDDBF0', color: '#333' }}
          onClick={onDeleteUser}
        />
        <input type="submit" value="정보 수정" />
      </StyledForm>
    </MyPageEdit>
  );
}
export default ProfileEdit;
