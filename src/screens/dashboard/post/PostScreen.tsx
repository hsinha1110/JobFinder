import React, { FC, useEffect, useState } from 'react';
import CustomSafeAreaView from '../../../components/SafeAreaView/SafeAreaView';
import styles from './styles';
import CustomDropdown from '../../../components/DropDown/CustomDropDown';
import Button from '../../../components/Button/Button';
import { data } from '../../../constants/Data';

import firestore from '@react-native-firebase/firestore';
import { Colors } from '../../../constants/Colors';
import { moderateScale } from 'react-native-size-matters';
import { useRoute } from '@react-navigation/native';
import CustomHeader from '../../../components/Header/Header';
import { goBack } from '../../../utils/NavigationUtil';
import Loader from '../../../components/Loader/Loader';
import { Modal } from 'react-native';
import CustomInput from '../../../components/Input/input/CustomInput';

const PostScreen: FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [experience, setExperience] = useState('');
  const [packageSalary, setPackageSalary] = useState('');
  const [company, setCompany] = useState('');
  const [skill, setSkill] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [titleError, setTitleError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [experienceError, setExperienceError] = useState('');
  const [packageError, setPackageError] = useState('');
  const [companyError, setCompanyError] = useState('');
  const [skillError, setSkillError] = useState('');

  const skills: string[] = [];

  const route = useRoute<any>();
  const { item } = route.params || {};

  useEffect(() => {
    if (item) {
      setTitle(item.title);
      setDescription(item.description);
      setCompany(item.company);
      setPackageSalary(item.packageSalary);
      setExperience(item.experience);
      setSkill(item.skill);
    }
  }, [item]);

  data.map(category => {
    category.keywords.map(keyword => {
      skills.push(keyword.toString());
    });
  });

  const validate = () => {
    let valid = true;

    setTitleError('');
    setDescriptionError('');
    setExperienceError('');
    setPackageError('');
    setCompanyError('');
    setSkillError('');

    if (!title.trim()) {
      setTitleError('Title is required');
      valid = false;
    }

    if (!description.trim()) {
      setDescriptionError('Description is required');
      valid = false;
    }

    if (!experience.trim()) {
      setExperienceError('Experience is required');
      valid = false;
    }

    if (!packageSalary.trim()) {
      setPackageError('Package is required');
      valid = false;
    }

    if (!company.trim()) {
      setCompanyError('Company name is required');
      valid = false;
    }

    if (!skill.trim()) {
      setSkillError('Skill is required');
      valid = false;
    }

    return valid;
  };

  const handlePost = async (): Promise<void> => {
    if (!validate()) return;

    setIsLoading(true);

    try {
      await firestore().collection('Jobs').add({
        title,
        description,
        experience,
        packageSalary,
        company,
        skill,
        createdAt: firestore.FieldValue.serverTimestamp(),
      });
      setTitle('');
      setDescription('');
      setExperience('');
      setPackageSalary('');
      setCompany('');
      setSkill('');
      setIsLoading(false);
      goBack();
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };
  const handleUpdate = async (): Promise<void> => {
    if (!validate()) return;

    setIsLoading(true);

    try {
      await firestore()
        .collection('Jobs')
        .doc(item.id)

        .update({
          title,
          description,
          experience,
          packageSalary,
          company,
          skill,
          createdAt: firestore.FieldValue.serverTimestamp(),
        });

      setIsLoading(false);
      goBack();
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };
  return (
    <CustomSafeAreaView style={styles.container}>
      <Modal visible={isLoading} transparent animationType="fade">
        <Loader />
      </Modal>
      <CustomHeader title={item ? 'Update Job' : 'Post Job'} />

      <CustomInput
        placeholder="Title"
        cursorColor={Colors.primary_black}
        value={title}
        error={titleError}
        onChangeText={(text: string) => {
          setTitle(text);
          if (titleError) setTitleError('');
        }}
        containerStyle={styles.inputStyle}
      />

      <CustomInput
        placeholder="Description"
        value={description}
        error={descriptionError}
        cursorColor={Colors.primary_black}
        onChangeText={(text: string) => {
          setDescription(text);
          if (descriptionError) setDescriptionError('');
        }}
        containerStyle={styles.inputStyle}
      />

      <CustomInput
        placeholder="Experience (Years)"
        value={experience}
        cursorColor={Colors.primary_black}
        error={experienceError}
        onChangeText={(text: string) => {
          setExperience(text);
          if (experienceError) setExperienceError('');
        }}
        containerStyle={styles.inputStyle}
      />

      <CustomInput
        placeholder="Package"
        cursorColor={Colors.primary_black}
        value={packageSalary}
        error={packageError}
        onChangeText={(text: string) => {
          setPackageSalary(text);
          if (packageError) setPackageError('');
        }}
        containerStyle={styles.inputStyle}
      />

      <CustomInput
        placeholder="Company Name"
        value={company}
        cursorColor={Colors.primary_black}
        error={companyError}
        onChangeText={(text: string) => {
          setCompany(text);
          if (companyError) setCompanyError('');
        }}
        containerStyle={styles.inputStyle}
      />

      <CustomDropdown
        data={skills}
        placeholder="Select Skill"
        value={skill}
        error={skillError}
        onSelect={(item: string) => {
          setSkill(item);
          console.log('Selected Skill:', item);
          if (skillError) setSkillError('');
        }}
      />

      <Button
        title={item ? 'Update Post' : 'Create Post'}
        onPress={item ? handleUpdate : handlePost}
        style={{
          width: '90%',
          backgroundColor: '#0096FF',
          height: 55,
          position: 'absolute',
          justifyContent: 'center',
          alignItems: 'center',
          bottom: moderateScale(20),
          alignSelf: 'center',
          borderRadius: 10,
        }}
        textStyle={{
          color: Colors.primary_white,
          fontWeight: 'bold',
          fontSize: 18,
        }}
      />
    </CustomSafeAreaView>
  );
};

export default PostScreen;
