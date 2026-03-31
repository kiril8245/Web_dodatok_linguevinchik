import UserModel from './model/UserModel.js';
import StudyModel from './model/StudyModel.js';
import UserView from './view/UserView.js';
import StudyView from './view/StudyView.js';
import AppController from './controller/AppController.js';

document.addEventListener('DOMContentLoaded', () => {
    const controller = new AppController(
        new UserModel(),
        new StudyModel(),
        new UserView(),
        new StudyView()
    );
    controller.init();
});