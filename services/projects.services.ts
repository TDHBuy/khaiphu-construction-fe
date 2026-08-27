import { ProjectsRepository } from "../repositories/projects.repository";
export const ProjectsService = {
  async getHomeProjects() {
    const projects = await ProjectsRepository.findFeatured(5);
    return projects;
  },
};
