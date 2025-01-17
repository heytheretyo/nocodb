import BasePage from '../../../Base';
import { GridPage } from '../../Grid';
import { GalleryPage } from '../../Gallery';
import { FormPage } from '../../Form';
import { KanbanPage } from '../../Kanban';
import { MapPage } from '../../Map';
import { expect, Locator } from '@playwright/test';

export class FootbarPage extends BasePage {
  readonly parent: GridPage | GalleryPage | FormPage | KanbanPage | MapPage;
  readonly leftSidebarToggle: Locator;
  readonly rightSidebarToggle: Locator;
  readonly btn_addNewRow: Locator;

  constructor(parent: GridPage | GalleryPage | FormPage | KanbanPage | MapPage) {
    super(parent.rootPage);
    this.parent = parent;
    this.leftSidebarToggle = this.get().locator(`div.nc-sidebar-left-toggle-icon`);
    this.rightSidebarToggle = this.get().locator(`div.nc-sidebar-right-toggle-icon`);
    this.btn_addNewRow = this.get().locator('button.ant-btn').nth(0);
  }

  get() {
    return this.rootPage.locator(`div.nc-pagination-wrapper`);
  }

  async clickAddRecord() {
    await this.get().locator(`button.ant-btn`).nth(0).click();
  }

  async verifyRoleAccess(param: { role: string }) {
    const role = param.role.toLowerCase();
    if (role === 'creator' || role === 'editor' || role === 'owner') {
      expect(await this.btn_addNewRow.count()).toBe(1);
    } else {
      expect(await this.btn_addNewRow.count()).toBe(0);
    }
  }

  async clickAddRecordFromForm() {
    await this.get().locator(`button.ant-btn`).nth(1).click();
    await this.rootPage.locator('.ant-dropdown-content:visible').waitFor();
    await this.rootPage.locator('.ant-dropdown-content:visible').locator('.nc-new-record-with-form').click();
  }
}
